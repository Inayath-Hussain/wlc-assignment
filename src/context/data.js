import { useState, createContext } from "react";

export const oneDriveData = createContext()

export const OneDriveDataProvider = ({ children }) => {
    const [data, setData] = useState([])

    const value = {
        data,
        setData
    }

    return (
        <oneDriveData.Provider value={value}>
            {children}
        </oneDriveData.Provider>
    )
}