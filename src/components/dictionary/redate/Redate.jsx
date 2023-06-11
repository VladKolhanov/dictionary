import styles from './Redate.module.css'
import { Window } from '../../../ui/Window'
import { WindowTitle } from '../../../ui/WindowTitle'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '../../../ui/Button'
import { getWordFromDataBase, putChangeWord } from '../../../api/json-server'
import { Preloader } from '../../../ui/Preloader'
import { BiPencil, BiShare } from 'react-icons/bi'
import { Field } from '../../../ui/Field'
import { TextArea } from '../../../ui/TextArea'
import { useForm } from 'react-hook-form'
import { Form } from '../../../ui/Form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAlert } from '../../../hook/useAlert'
import { AlertAddWord } from '../AlertAddWord'

export const Redate = (props) => {
   const [wordData, setWordData] = useState(null)
   const { wordId } = useParams()

   const [alertOk, displayAlertOk] = useAlert()
   const [alertError, displayAlertError] = useAlert()

   const schema = yup.object({
      wordEn: yup.string().trim().lowercase().required('Field should be filled'),
      wordTr: yup.string().trim().lowercase().required('Field should be filled'),
      sentenceEn: yup.string().trim().required('Field should be filled'),
      sentenceTr: yup.string().trim().required('Field should be filled'),
      note: yup.string().trim(),
   })

   const navigate = useNavigate()

   const dataDownload = async () => {
      try {
         const responseData = await getWordFromDataBase(wordId)

         setWordData(responseData)

         return {
            wordEn: responseData.wordEn,
            wordTr: responseData.wordTr,
            sentenceEn: responseData.sentenceEn,
            sentenceTr: responseData.sentenceTr,
            note: responseData.note,
         }
      } catch (error) {
         ///////////////////////////
      }
   }

   const {
      register,
      handleSubmit,
      control,
      formState: { errors, isValid, isSubmitting },
   } = useForm({
      defaultValues: dataDownload,
      mode: 'onBlur',
      resolver: yupResolver(schema),
   })

   const backToDictionaryHandler = () => navigate(-1)

   const submitFormHandler = async (data) => {
      try {
         const dataForSend = { ...wordData, ...data }

         if (dataForSend.note?.length === 0) {
            dataForSend.hasNote = false
            delete dataForSend.note
         }

         if (dataForSend.note?.length > 0) {
            dataForSend.hasNote = true
         }

         await putChangeWord(dataForSend)

         displayAlertOk('The word was successfully added to the dictionary.', 2500)

         setTimeout(() => {
            navigate('/dictionary')
         }, 2500)
      } catch (error) {
         displayAlertError(error.message, 2500)
      }
   }

   return (
      <>
         {alertOk && <AlertAddWord message={alertOk} variant="ok" />}
         {alertError && <AlertAddWord message={alertError} variant="error" />}

         {!wordData && <Preloader className={styles.preloader} />}

         {wordData && (
            <Window className={styles.window}>
               <WindowTitle>Redate word "{wordData.wordEn}"</WindowTitle>
               <Form noValidate onSubmit={handleSubmit(submitFormHandler)} control={control}>
                  <Field
                     label="Word (English)"
                     type="text"
                     hasError={!!errors.wordEn}
                     error={errors.wordEn?.message}
                     maxLength="30"
                     required
                     {...register('wordEn')}
                  />
                  <Field
                     label="Word (Translate)"
                     type="text"
                     hasError={!!errors.wordTr}
                     error={errors.wordTr?.message}
                     maxLength="30"
                     required
                     {...register('wordTr')}
                  />
                  <Field
                     label="Sentence (English)"
                     type="text"
                     hasError={!!errors.sentenceEn}
                     error={errors.sentenceEn?.message}
                     maxLength="80"
                     required
                     {...register('sentenceEn')}
                  />
                  <Field
                     label="Sentence (Translate)"
                     type="text"
                     hasError={!!errors.sentenceTr}
                     error={errors.sentenceTr?.message}
                     maxLength="80"
                     required
                     {...register('sentenceTr')}
                  />
                  <TextArea
                     maxLength="225"
                     placeholder="Add a note to this word"
                     {...register('note')}
                  />

                  <div className={styles.action}>
                     <Button
                        type="button"
                        icon={<BiShare />}
                        disabled={isSubmitting || alertOk}
                        onClick={() => backToDictionaryHandler()}
                     >
                        Back to Dicitionary
                     </Button>
                     <Button
                        type="submit"
                        icon={<BiPencil />}
                        disabled={!isValid}
                        isSubmitting={isSubmitting || alertOk}
                        hasPreloader
                     >
                        Redate this word
                     </Button>
                  </div>
               </Form>
            </Window>
         )}
      </>
   )
}
