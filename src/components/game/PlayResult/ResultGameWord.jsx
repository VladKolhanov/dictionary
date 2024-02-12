import styles from './ResultGameWord.module.css'

import React from 'react'
import { Window } from '../../../ui/Window'
import { WindowTitle } from '../../../ui/WindowTitle'
import { Button } from '../../../ui/Button'
import { FiSettings } from 'react-icons/fi'
import { HiOutlineArrowPath } from 'react-icons/hi2'

export const ResultGameWord = ({ result, digitCorrectAnswers, onBackToSettings, onTryAgain }) => {
   return (
      <Window className={styles.window}>
         <WindowTitle>Results</WindowTitle>

         <p className={styles.correctAnswers}>
            You correct answered on {digitCorrectAnswers} of 25 questions.
         </p>

         <table className={styles.table}>
            <thead>
               <tr>
                  <th>Word</th>
                  <th>Translate</th>
                  <th>Your input</th>
                  <th>Ok?</th>
               </tr>
            </thead>
            <tbody>
               {result.map((item) => (
                  <tr key={item.wordEn}>
                     <td>{item.wordEn}</td>
                     <td>{item.wordTr}</td>
                     <td>{item.inputTranslate}</td>
                     <td
                        className={item.isCorrectResponse ? styles.correct : styles.unCorrect}
                     ></td>
                  </tr>
               ))}
            </tbody>
         </table>

         <div className={styles.active}>
            <Button type="button" icon={<HiOutlineArrowPath />} onClick={onTryAgain}>
               Try Again
            </Button>
            <Button type="button" icon={<FiSettings />} onClick={onBackToSettings}>
               Change Settings
            </Button>
         </div>
      </Window>
   )
}
