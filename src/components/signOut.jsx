import { useMsal } from '@azure/msal-react';
import './main.css';

const SignOut = () => {
    const { instance } = useMsal();

    const logout = () => {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        })
    }

    return (
        <button className='SignOut' onClick={logout}>SignOut</button>
    );
}

export default SignOut;