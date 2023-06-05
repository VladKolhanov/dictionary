import React, { useContext, useState } from 'react'

const DataContext = React.createContext()

export const DataProvider = ({ children }) => {
   const [data, setData] = useState({})

   const setValues = (values) => setData((prevState) => (values ? { ...prevState, ...values } : {}))

   return <DataContext.Provider value={{ data, setValues }}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
