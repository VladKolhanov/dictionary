import React from 'react'
import { useResultGame } from '../../../context/ResultGameContext'
import { useSettingsGame } from '../../../context/SettingsGameContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { ResultGameWord } from './ResultGameWord'
import { ResultGameSentence } from './ResultGameSentence'

export const ResultGame = () => {
   const { resultGame } = useResultGame()
   const { settings } = useSettingsGame()

   const navigate = useNavigate()

   const correctAnswer = resultGame?.reduce(
      (acc, answer) => (answer.isCorrectResponse ? acc + 1 : acc),
      0
   )

   const handleBackToSettings = () => navigate(`/settings-game?g=${settings.gameName}`)

   const handleTryAgain = () => navigate('/play-game')

   if (!resultGame) {
      return <Navigate to="/select-game" />
   }

   return (
      <>
         {settings.gameName === 'translateWord' && (
            <ResultGameWord
               result={resultGame}
               digitCorrectAnswers={correctAnswer}
               onBackToSettings={handleBackToSettings}
               onTryAgain={handleTryAgain}
            />
         )}

         {settings.gameName === 'translateSentence' && (
            <ResultGameSentence
               result={resultGame}
               digitCorrectAnswers={correctAnswer}
               onBackToSettings={handleBackToSettings}
               onTryAgain={handleTryAgain}
            />
         )}
      </>
   )
}
