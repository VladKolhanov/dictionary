import styles from './PlayGameWord.module.css'

import React, { useEffect, useState } from 'react'
import { WindowTitle } from '../../../ui/WindowTitle'
import { Window } from '../../../ui/Window'
import { Form } from '../../../ui/Form'
import { SupportText } from '../../../ui/SupportText'
import { getWordsForGame } from '../../../api/json-server'
import { useNavigate } from 'react-router-dom'
import { useTimer } from '../../../hook/useTimer'
import { useResultGame } from '../../../context/ResultGameContext'

export const PlayGameWord = ({ settings }) => {
   const { setResultGameValue } = useResultGame()
   const [stepsQuantity, setStepsQuantity] = useState(25)
   const [words, setWords] = useState([])
   const [stepsTaken, setStepsTaken] = useState([])
   const [currentSteps, setCurrentSteps] = useState(null)
   const [inputAnswer, setInputAnswer] = useState('')

   const navigate = useNavigate()
   const [timer, resumeTime] = useTimer(settings.responseTime)

   useEffect(() => {
      if (settings) {
         ;(async () => setWords(await getWordsForGame(settings.wordsQuantity)))()
      }
   }, [])

   useEffect(() => {
      if (stepsTaken.length === stepsQuantity) {
         setResultGameValue(stepsTaken)
         return navigate('/game-result')
      }

      resumeTime()
      generateRandomWord()
   }, [stepsTaken, words])

   const generateRandomWord = () => {
      let currentObj

      do {
         let wordIndex = Math.floor(Math.random() * words.length)
         currentObj = { ...words[wordIndex] }
      } while (stepsTaken.some((word) => word.id === currentObj.id))

      return setCurrentSteps(currentObj)
   }

   const handleSubmitResponse = (e) => {
      e.preventDefault()

      currentSteps[settings.language === 'english' ? 'wordTr' : 'wordEn'] ===
         inputAnswer.trim().toLowerCase() && inputAnswer
         ? setStepsTaken((p) => [
              ...p,
              { ...currentSteps, inputTranslate: inputAnswer, isCorrectResponse: true },
           ])
         : setStepsTaken((p) => [
              ...p,
              { ...currentSteps, inputTranslate: inputAnswer, isCorrectResponse: false },
           ])

      resumeTime()
      setInputAnswer('')
   }

   if (timer < 0) {
      setStepsTaken((p) => [
         ...p,
         { ...currentSteps, inputTranslate: 'None. Time Finish!!!', isCorrectResponse: false },
      ])

      resumeTime()
      setInputAnswer('')
   }

   return (
      <>
         <Window className={styles.window}>
            <WindowTitle>Game "{settings.gameName}"</WindowTitle>

            <>
               <p className={styles.stepInfo}>
                  Step {stepsTaken.length + 1} of {stepsQuantity}
               </p>

               <div className={styles.game}>
                  <div className={styles.timer}>{timer}</div>

                  <p className={styles.randomWord}>
                     {settings.language === 'english' && currentSteps?.wordEn}
                     {settings.language === 'translated' && currentSteps?.wordTr}
                  </p>

                  <Form className={styles.form} onSubmit={handleSubmitResponse}>
                     <input
                        type="text"
                        name="answer"
                        onChange={(e) => setInputAnswer(e.target.value)}
                        value={inputAnswer}
                        autoFocus
                     />
                  </Form>
               </div>

               <SupportText>
                  Press <span>"Enter"</span> for send your response
               </SupportText>
            </>
         </Window>
      </>
   )
}
