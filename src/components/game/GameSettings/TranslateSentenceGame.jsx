import { Form } from '../../../ui/Form'
import { RadioButton } from '../../../ui/RadioButton'
import React from 'react'

export const TranslateSentenceGame = ({ id, onSubmitForm }) => {
   return (
      <Form onSubmit={(event) => onSubmitForm(event, id)} id={id}>
         <fieldset>
            <legend>Show sentence:</legend>
            <RadioButton label="english" name="language" value="english" defaultChecked />
            <RadioButton label="translated" name="language" value="translated" />
         </fieldset>
         <fieldset>
            <legend>Sentence quantity:</legend>
            <RadioButton label="30 sentence" name="sentenceQuantity" value="30" defaultChecked />
            <RadioButton label="50 sentence" name="sentenceQuantity" value="50" />
            <RadioButton label="100 sentence" name="sentenceQuantity" value="100" />
            <RadioButton label="all sentence" name="sentenceQuantity" value="all" />
         </fieldset>
         <fieldset>
            <legend>Response time:</legend>
            <RadioButton label="10 seconds" name="responseTime" value="10" defaultChecked />
            <RadioButton label="15 seconds" name="responseTime" value="15" />
            <RadioButton label="20 seconds" name="responseTime" value="20" />
            <RadioButton label="No time" name="responseTime" value="No time" />
         </fieldset>
      </Form>
   )
}
