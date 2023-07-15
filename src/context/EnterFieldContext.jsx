import React, { useContext, useState } from 'react'

const EnterFieldContext = React.createContext()

export const EnterFieldContextProvider = ({ children }) => {
   const [data, setData] = useState({})

   const setValues = (values) => setData((prevState) => (values ? { ...prevState, ...values } : {}))

   return (
      <EnterFieldContext.Provider value={{ data, setValues }}>
         {children}
      </EnterFieldContext.Provider>
   )
}

export const useData = () => useContext(EnterFieldContext)
