import React, { useContext, useState } from 'react'

const ResultGameContext = React.createContext()

export const ResultGameProvider = ({ children }) => {
   const [resultGame, setResultGame] = useState(null)

   const setResultGameValue = (data) => setResultGame(data)

   return (
      <ResultGameContext.Provider value={{ resultGame, setResultGameValue }}>
         {children}
      </ResultGameContext.Provider>
   )
}

export const useResultGame = () => useContext(ResultGameContext)
