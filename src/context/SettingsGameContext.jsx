import React, { useContext, useState } from 'react'

const SettingsGameContext = React.createContext()

export const SettingsGameProvider = ({ children }) => {
   const [settings, setSettings] = useState(null)

   const setSettingsValue = (data) => setSettings(data)

   return (
      <SettingsGameContext.Provider value={{ settings, setSettingsValue }}>
         {children}
      </SettingsGameContext.Provider>
   )
}

export const useSettingsGame = () => useContext(SettingsGameContext)
