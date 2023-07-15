import { useNavigate } from 'react-router-dom'
import { getWordsForGame } from '../../api/json-server'
import { useTimer } from '../../hook/useTimer'
import { Form } from '../../ui/Form'
import { Window } from '../../ui/Window'
import { WindowTitle } from '../../ui/WindowTitle'
import { InfoAboutGame } from './InfoAboutGame'
import styles from './PlayGame.module.css'
import React, { useEffect, useRef, useState } from 'react'
import { SupportText } from '../../ui/SupportText'

export const PlayGame = ({ wordsQuantity, language, responseTime, typeGame }) => {
   const [words, setWords] = useState([])
   const [isGameStarted, setIsGameStarted] = useState(false)
   const [stepsQuantity, setStepsQuantity] = useState(25)
   const [stepsTaken, setStepsTaken] = useState([])
   const [currentSteps, setCurrentSteps] = useState(null)
   const [inputAnswer, setInputAnswer] = useState('')

   const windowRef = useRef(null)
   const navigate = useNavigate()

   const [timer, resumeTime] = useTimer(responseTime)

   useEffect(() => {
      windowRef.current.focus()
      ;(async () => setWords(await getWordsForGame(wordsQuantity)))()
   }, [])

   useEffect(() => {
      if (stepsTaken.length === stepsQuantity) {
         return navigate('/')
      }

      generateRandomWord()
   }, [isGameStarted, stepsTaken])

   const generateRandomWord = () => {
      let currentObj

      do {
         let wordIndex = Math.floor(Math.random() * words.length)
         currentObj = { ...words[wordIndex] }
      } while (stepsTaken.some((word) => word.id === currentObj.id))

      return setCurrentSteps(currentObj)
   }

   const handleStartGame = (e) => {
      if (e.code === 'Space' && !isGameStarted) {
         setIsGameStarted(true)
         resumeTime()
      }
   }

   const handleSubmitResponse = (e) => {
      e.preventDefault()
      currentSteps[language === 'english' ? 'wordTr' : 'wordEn'] ===
      inputAnswer.trim().toLowerCase()
         ? setStepsTaken((p) => [...p, { ...currentSteps, isCorrectResponse: true }])
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
      <Window ref={windowRef} tabIndex={-1} onKeyDown={handleStartGame} className={styles.window}>
         <WindowTitle>Game "{typeGame}"</WindowTitle>
         {!isGameStarted && (
            <InfoAboutGame
               wordsQuantity={wordsQuantity}
               language={language}
               responseTime={responseTime}
            />
         )}

         {isGameStarted && (
            <>
               <p className={styles.stepInfo}>
                  Step {stepsTaken.length + 1} of {stepsQuantity}
               </p>

               <div className={styles.game}>
                  <div className={styles.timer}>{timer}</div>

                  <p className={styles.randomWord}>
                     {language === 'english' && currentSteps.wordEn}
                     {language === 'translated' && currentSteps.wordTr}
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
         )}
      </Window>
   )
}
