import { useMsal } from '@azure/msal-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper, Checkbox } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

import { oneDriveData } from '../context/data';
import { loginRequest, uploadDriveEndpoint } from '../authConfig';
import { callMeDrive } from '../services/listDrive';
import { uploadToDrive } from '../services/upload';
import SignOut from './signOut';
import './main.css'

const Main = () => {
    const { instance, accounts } = useMsal();
    const { data, setData } = useContext(oneDriveData)
    const [showLinks, setShowLinks] = useState([])
    const [file, setFile] = useState({})
    console.log(data)

    const fetchDrive = async () => {
        // fetch drive files

        try {

            const result = await callMeDrive(localStorage.getItem('access_token'));
            setData(result.value)

        }

        catch (ex) {

            const aT = await instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0]
            })
            localStorage.setItem('access_token', aT.accessToken)
            const result = await callMeDrive(aT.accessToken);
            console.log('catch', result)
            setData(result.value)
        }
    }

    const units = ['bytes', 'KB', 'MB'];

    function size(x) {
        let l = 0, n = parseInt(x, 10) || 0;

        while (n >= 1024 && ++l) {
            n = n / 1024;
        }

        return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
    }

    function dateString(d) {
        const date = new Date(d)
        return date.toDateString()
    }

    function handleLinks(d) {

        if (showLinks.includes(d)) {
            const newShowLink = showLinks.filter(l => l !== d)
            setShowLinks([...newShowLink])
        }
        else {
            setShowLinks([...showLinks, d])
        }
    }

    async function upload() {

        if (file.name === '') {
            console.log('select a file')
            return
        }
        console.log(file)
        const url = uploadDriveEndpoint(file.name)
        console.log(url)
        // uploadToDrive(localStorage.getItem('access_token'), url, file.type)
        try {
            const r = await uploadToDrive(localStorage.getItem('access_token'), url, file).then(fetchDrive)
            console.log(r.error)
            if (r.error) {
                const aT = await instance.acquireTokenSilent({
                    ...loginRequest,
                    account: accounts[0]
                })
                localStorage.setItem('access_token', aT.accessToken)
                await uploadToDrive(localStorage.getItem('access_token'), url, file).then(fetchDrive).catch(e => console.log(e))
            }
        }
        catch (ex) {
            console.log(ex)
            const aT = await instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0]
            })
            localStorage.setItem('access_token', aT.accessToken)
            await uploadToDrive(localStorage.getItem('access_token'), url, file).then(fetchDrive).catch(e => console.log(e))
        }
    }

    return (
        <div>
            <div className='NavBar'>

                <button onClick={fetchDrive} className='refresh'>Refresh</button>
                <SignOut />
            </div>
            <div className='upload'>
                <input type="file" id="f" onChange={e => setFile(e.target.files[0])} />
                <button onClick={upload}> Upload to OneDrive </button>

            </div>


            <br />
            <div className='onedrivetable'>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Modified</TableCell>
                                <TableCell>File Size</TableCell>
                                <TableCell width='25%'>Link</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length > 1 && data.map(d => (
                                <TableRow key={d.id} >
                                    <TableCell>
                                        <Checkbox id={d.id} checked={showLinks.includes(d.id) ? true : false} onChange={() => handleLinks(d.id)} />
                                    </TableCell>
                                    <TableCell>{d.folder && <FolderIcon color='primary' fontSize='inherit' />} {d.name}</TableCell>
                                    <TableCell>{dateString(d.createdDateTime)}</TableCell>
                                    <TableCell>{dateString(d.lastModifiedDateTime)}</TableCell>
                                    <TableCell >{d.size ? size(d.size) : ''}</TableCell>
                                    <TableCell>{showLinks.includes(d.id) ? <Link to={d.webUrl} target='_blank'>{d.webUrl}</Link> : ''}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default Main;