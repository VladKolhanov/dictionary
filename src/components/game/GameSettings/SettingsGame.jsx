import styles from './SettingsGame.module.css'
import React, { useState } from 'react'
import { WindowTitle } from '../../../ui/WindowTitle'
import { Window } from '../../../ui/Window'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TranslateWordGame } from './TranslateWordGame'
import { IrregularVerbsGame } from './IrregularVerbsGame'
import { TranslateSentenceGame } from './TranslateSentenceGame'
import { Button } from '../../../ui/Button'
import { TbShare3 } from 'react-icons/tb'
import { BiShare } from 'react-icons/bi'
import { InfoAboutGame } from './InfoAboutGame'

export const SettingsGame = () => {
   const [settings, setSettings] = useState(null)
   const [searchParams] = useSearchParams()
   const navigate = useNavigate()

   const gameName = searchParams.get('g')

   const handleClickBack = () => navigate('/select-game')

   const handleSubmitForm = async (event, formId) => {
      event.preventDefault()
      const formData = new FormData(event.target)
      const data = Object.fromEntries(formData)
      const fullData = { ...data, gameName: gameName }

      setSettings(fullData)
   }

   return (
      <>
         {settings && <InfoAboutGame {...settings} />}

         {!settings && (
            <Window className={styles.windowSettingsGame}>
               <WindowTitle>Settings game</WindowTitle>

               {gameName === 'translateWord' && (
                  <TranslateWordGame id="formSettingsForGame" onSubmitForm={handleSubmitForm} />
               )}

               {gameName === 'translateSentence' && (
                  <TranslateSentenceGame id="formSettingsForGame" onSubmitForm={handleSubmitForm} />
               )}

               <div className={styles.active}>
                  <Button onClick={handleClickBack} type="button" icon={<BiShare />}>
                     Back to select game
                  </Button>
                  <Button
                     type="submit"
                     form="formSettingsForGame"
                     icon={<TbShare3 />}
                     className={styles.btnContinue}
                  >
                     Continue
                  </Button>
               </div>
            </Window>
         )}
      </>
   )
}
