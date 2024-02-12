import styles from './InfoAboutGame.module.css'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SupportText } from '../../../ui/SupportText'
import { Window } from '../../../ui/Window'
import { useSettingsGame } from '../../../context/SettingsGameContext'

export const InfoAboutGame = (props) => {
   const navigate = useNavigate()
   const { setSettingsValue } = useSettingsGame()
   const windowRef = useRef(null)

   useEffect(() => {
      windowRef.current.focus()
   }, [])

   const handleKeyDown = (e) => {
      if (e.code === 'Space') {
         setSettingsValue(props)
         navigate('/play-game')
      }
   }

   return (
      <div className={styles.wrapper} tabIndex={0} ref={windowRef} onKeyDown={handleKeyDown}>
         <Window className={styles.infoWindow}>
            <p className={styles.gameInfo}>
               In this game you have to enter the word translation for the displayed word.
            </p>

            <ul className={styles.listSettings}>
               <h3>Your settings: </h3>
               <li>Language: {props.language}</li>
               <li>
                  Quantity words into game: {props.wordsQuantity}{' '}
                  {props.wordsQuantity === 'all' ? '' : 'last '}
                  words in the dictionary
               </li>
               <li>Quantity qustions: 25(fixed)</li>
               <li>Time on response: {props.responseTime}</li>
            </ul>

            <SupportText>
               Press <span>"Space"</span> to continue.
            </SupportText>
         </Window>
      </div>
   )
}
