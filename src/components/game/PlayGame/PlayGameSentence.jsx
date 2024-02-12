import styles from './PlayGameSentence.module.css'

import React, { useEffect, useState } from 'react'
import { WindowTitle } from '../../../ui/WindowTitle'
import { Window } from '../../../ui/Window'
import { Form } from '../../../ui/Form'
import { SupportText } from '../../../ui/SupportText'
import { getSentencesForGame } from '../../../api/json-server'
import { useNavigate } from 'react-router-dom'
import { useTimer } from '../../../hook/useTimer'
import { useResultGame } from '../../../context/ResultGameContext'

export const PlayGameSentence = ({ settings }) => {
   const { setResultGameValue } = useResultGame()
   const [stepsQuantity, setStepsQuantity] = useState(25)
   const [sentences, setSentences] = useState([])
   const [stepsTaken, setStepsTaken] = useState([])
   const [currentSteps, setCurrentSteps] = useState(null)
   const [inputAnswer, setInputAnswer] = useState('')

   const navigate = useNavigate()
   const [timer, resumeTime] = useTimer(settings.responseTime)

   useEffect(() => {
      if (settings) {
         ;(async () => setSentences(await getSentencesForGame(settings.sentenceQuantity)))()
      }
   }, [])

   useEffect(() => {
      if (stepsTaken.length === stepsQuantity) {
         setResultGameValue(stepsTaken)
         return navigate('/game-result')
      }

      if (settings.responseTime !== 'No time') {
         resumeTime()
      }

      generateRandomSentence()
   }, [stepsTaken, sentences])

   const generateRandomSentence = () => {
      let currentObj

      do {
         let sentenceIndex = Math.floor(Math.random() * sentences.length)
         currentObj = { ...sentences[sentenceIndex] }
      } while (stepsTaken.some((sentence) => sentence.id === currentObj.id))

      return setCurrentSteps(currentObj)
   }

   const handleSubmitResponse = (e) => {
      e.preventDefault()

      currentSteps[settings.language === 'english' ? 'sentenceTr' : 'sentenceEn'] ===
         inputAnswer.trim().toLowerCase() && inputAnswer
         ? setStepsTaken((p) => [
              ...p,
              { ...currentSteps, inputTranslate: inputAnswer, isCorrectResponse: true },
           ])
         : setStepsTaken((p) => [
              ...p,
              { ...currentSteps, inputTranslate: inputAnswer, isCorrectResponse: false },
           ])

      if (settings.responseTime !== 'No time') {
         resumeTime()
      }

      setInputAnswer('')
   }

   if (timer < 0) {
      setStepsTaken((p) => [
         ...p,
         { ...currentSteps, inputTranslate: 'None. Time Finish!!!', isCorrectResponse: false },
      ])

      if (settings.responseTime !== 'No time') {
         resumeTime()
      }

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

               <div
                  className={settings.responseTime !== 'No time' ? styles.game : styles.gameNoTime}
               >
                  {settings.responseTime !== 'No time' && (
                     <div className={styles.timer}>{timer}</div>
                  )}

                  <p className={styles.randomSentence}>
                     {settings.language === 'english' && currentSteps?.sentenceEn}
                     {settings.language === 'translated' && currentSteps?.sentenceTr}
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
