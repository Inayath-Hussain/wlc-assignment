
import { LogLevel } from "@azure/msal-browser";


export const msalConfig = {
    auth: {
        clientId: "72c73808-13c9-48de-b6a9-b80eb9a6c929",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000/"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};


export const loginRequest = {
    scopes: ["User.Read",
        "User.ReadWrite.All",
        "Files.Read",
        "Files.Read.All",
        "Files.ReadWrite",
        "Files.ReadWrite.All",
        'Sites.ReadWrite.All'
    ]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    listDriveEndpoint: "https://graph.microsoft.com/v1.0/me/drive/root/children"
};

export const uploadDriveEndpoint = (fileName) => {
    return `https://graph.microsoft.com/v1.0/me/drive/root:/${fileName}:/content`
}