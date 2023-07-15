import styles from './SettingsGame.module.css'
import React, { useEffect, useState } from 'react'
import { RadioButton } from '../../ui/RadioButton'
import { TbShare3 } from 'react-icons/tb'
import { Button } from '../../ui/Button'
import { Form } from '../../ui/Form'
import { WindowTitle } from '../../ui/WindowTitle'
import { Window } from '../../ui/Window'

export const SettingsGame = ({ onHandleSetSettings }) => {
   const handleSubmitForm = (e) => onHandleSetSettings(e)

   return (
      <Window className={styles.window}>
         <WindowTitle>Settings</WindowTitle>
         <Form onSubmit={handleSubmitForm} className={styles.formSettingsGame}>
            <fieldset>
               <legend>Type Game:</legend>
               <RadioButton label="noun" name="typeGame" value="noun" defaultChecked />
               <RadioButton label="irregular verb" name="typeGame" value="irregularVerb" />
            </fieldset>
            <fieldset>
               <legend>Language words:</legend>
               <RadioButton label="english" name="language" value="english" defaultChecked />
               <RadioButton label="translated" name="language" value="translated" />
            </fieldset>
            <fieldset>
               <legend>Words quantity:</legend>
               <RadioButton label="30 words" name="wordsQuantity" value="30" defaultChecked />
               <RadioButton label="50 words" name="wordsQuantity" value="50" />
               <RadioButton label="100 words" name="wordsQuantity" value="100" />
               <RadioButton label="all words" name="wordsQuantity" value="all" />
            </fieldset>
            <fieldset>
               <legend>Response time:</legend>
               <RadioButton label="5 seconds" name="responseTime" value="5" defaultChecked />
               <RadioButton label="7 seconds" name="responseTime" value="7" />
               <RadioButton label="10 seconds" name="responseTime" value="10" />
               <RadioButton label="15 seconds" name="responseTime" value="15" />
            </fieldset>
            <Button icon={<TbShare3 />} type="submit">
               to Game
            </Button>
         </Form>
      </Window>
   )
}
