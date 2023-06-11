import styles from './AddNote.module.css'
import * as yup from 'yup'
import { Window } from '../../../ui/Window'
import { WindowTitle } from '../../../ui/WindowTitle'
import { Form, useNavigate } from 'react-router-dom'
import { Button } from '../../../ui/Button'
import { useForm } from 'react-hook-form'
import { BiShare } from 'react-icons/bi'
import { BiPlus } from 'react-icons/bi'
import { TextArea } from '../../../ui/TextArea'
import { useData } from '../../../context/dictionaryContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAlert } from '../../../hook/useAlert'
import { addWordIntoDictionary } from '../../../api/json-server'
import { useEffect } from 'react'
import { AlertAddWord } from '../AlertAddWord'

export const AddNote = (props) => {
   const { data, setValues } = useData()
   const [alertOk, displayAlertOk] = useAlert()
   const [alertError, displayAlertError] = useAlert()
   const navigate = useNavigate()

   useEffect(() => {
      !data.wordEn && navigate('/add-word')
   }, [])

   const schema = yup.object({ note: yup.string().trim() })

   const {
      handleSubmit,
      register,
      control,
      formState: { isSubmitting },
   } = useForm({ defaultValues: { note: '' }, resolver: yupResolver(schema) })

   const btnBackToAddWordHandler = () => navigate('/add-word')

   const submitFormHandler = async (note) => {
      try {
         const fullDataForm = { ...data, ...note }

         if (!fullDataForm.note) {
            fullDataForm.hasNote = false
            delete fullDataForm.note
         }

         await addWordIntoDictionary(fullDataForm)

         displayAlertOk('The word was successfully added to the dictionary.', 2500)

         setTimeout(() => {
            setValues()
            navigate('/add-word')
         }, 2500)
      } catch (error) {
         displayAlertError(error.message, 2500)
      }
   }

   return (
      <>
         {alertOk && <AlertAddWord message={alertOk} variant="ok" />}
         {alertError && <AlertAddWord message={alertError} variant="error" />}

         <Window className={styles.addNoteWindow}>
            <WindowTitle>Add a note to a word</WindowTitle>
            <Form noValidate control={control} onSubmit={handleSubmit(submitFormHandler)}>
               <div className={styles.resultInfo}>
                  <div>
                     {data.wordEn} - {data.wordTr}
                  </div>
                  <div>{data.sentenceEn}</div>
                  <div>{data.sentenceTr}</div>
               </div>

               <TextArea
                  maxLength="225"
                  placeholder="Add a note to this word"
                  {...register('note')}
               />

               <div className={styles.actions}>
                  <Button
                     disabled={isSubmitting || alertOk}
                     type="button"
                     icon={<BiShare />}
                     onClick={btnBackToAddWordHandler}
                  >
                     Back to "Add word"
                  </Button>

                  <Button
                     disabled={isSubmitting || alertOk}
                     type="submit"
                     icon={<BiPlus />}
                     hasPreloader
                     isSubmitting={isSubmitting || alertOk}
                  >
                     Add Word
                  </Button>
               </div>
            </Form>
         </Window>
      </>
   )
}
