import { SupportText } from '../../ui/SupportText'
import styles from './InfoAboutGame.module.css'
import React from 'react'

export const InfoAboutGame = ({ wordsQuantity, language, responseTime }) => {
   return (
      <>
         <p className={styles.gameInfo}>
            In this game you have to enter the word translation for the displayed word.
         </p>

         <ul className={styles.listSettings}>
            <h3>Your settings: </h3>
            <li>Language: {language}</li>
            <li>
               Quantity words into game: {wordsQuantity} {wordsQuantity === 'all' ? '' : 'last '}
               words in the dictionary
            </li>
            <li>Quantity qustions: 25(fixed)</li>
            <li>Time on response: {responseTime}</li>
         </ul>

         <SupportText>
            Press <span>"Space"</span> to continued.
         </SupportText>
      </>
   )
}
