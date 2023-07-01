import { createContext, useState } from "react";
const DataContext = createContext({});

export const DataProvider = ({ children}) => {
    
    const [curContestId, setCurContestId] = useState(-1); 

    return (
        <DataContext.Provider value={{
            curContestId, setCurContestId
        }}>{children}</DataContext.Provider>
    )
}

export default DataContext;