import styles from './Game.module.css'
import { SettingsGame } from './SettingsGame'
import { useState } from 'react'
import { PlayGame } from './PlayGame'

export const Game = (props) => {
   const [hasSettings, setHasSettings] = useState(null)

   const handleSetSettings = (e) => {
      e.preventDefault()

      const formData = new FormData(e.target)
      const settings = Object.fromEntries(formData)

      setHasSettings(settings)
   }

   if (!hasSettings) {
      return <SettingsGame onHandleSetSettings={handleSetSettings} />
   }

   return <PlayGame {...hasSettings} />
}
