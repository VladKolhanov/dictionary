import { useSettingsGame } from '../../../context/SettingsGameContext'

import React from 'react'
import { PlayGameWord } from './PlayGameWord'
import { PlayGameSentence } from './PlayGameSentence'
import { Navigate } from 'react-router-dom'

export const PlayGame = () => {
   const { settings } = useSettingsGame()

   if (!settings) {
      return <Navigate to={'/select-game'} />
   }

   return (
      <>
         {settings.gameName === 'translateWord' && <PlayGameWord settings={settings} />}
         {settings.gameName === 'translateSentence' && <PlayGameSentence settings={settings} />}
      </>
   )
}
