import React,{useState,createContext,useContext} from 'react'

export const UserContext = createContext();
export const UserProvider = props => {
    const [user,setUser] = useState(null);
    return <UserContext.Provider value={[user,setUser]} {...props}></UserContext.Provider>
}
export const useUserStore = () => useContext(UserContext)