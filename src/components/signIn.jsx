import React, { useContext } from "react";
import { useMsal } from "@azure/msal-react";

import { loginRequest } from "../authConfig";
import { callMeDrive } from '../services/listDrive'
import { oneDriveData } from '../context/data'

export const SignIn = () => {
    const { instance } = useMsal();
    const { setData } = useContext(oneDriveData)

    const handleLogin = async () => {

        try {
            const aT = await instance.loginPopup(loginRequest)
            localStorage.setItem('access_token', aT.accessToken)
            const result = await callMeDrive(aT.accessToken)
            console.log('result', result)
            setData(result.value)
        }
        catch (ex) {
            console.log(ex)
        }

    }
    return (
        <div className="container">

            <div className="SignInContainer">
                <h2>LogIn to Your OneDrive</h2>
                <button onClick={handleLogin} className='SignIn'>SignIn</button>
            </div>
        </div>
    )
}