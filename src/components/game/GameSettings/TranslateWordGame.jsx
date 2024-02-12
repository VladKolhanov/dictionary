import { Form } from '../../../ui/Form'
import { RadioButton } from '../../../ui/RadioButton'
import React from 'react'

export const TranslateWordGame = ({ id, onSubmitForm }) => {
   return (
      <Form onSubmit={(event) => onSubmitForm(event, id)} id={id}>
         <fieldset>
            <legend>Show words:</legend>
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
      </Form>
   )
}
