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
import { AlertAddWord } from './AlertAddWord'

export const AddNote = (props) => {
   const { data, setValues } = useData()
   const [isAlertOk, showAlertOk] = useAlert()
   const [isAlertError, showAlertError] = useAlert()
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

   const submitFormHndler = async (note) => {
      const fullDataForm = { ...data, ...note }

      if (!fullDataForm.note) {
         fullDataForm.hasNote = false
         delete fullDataForm.note
      }

      const response = await addWordIntoDictionary(fullDataForm)

      if (!response.ok) {
         return showAlertError(4000)
      }

      showAlertOk(4000)

      setTimeout(() => {
         setValues()
         navigate('/add-word')
      }, 4000)
   }

   return (
      <>
         {isAlertError && <AlertAddWord error />}
         {isAlertOk && <AlertAddWord ok />}

         <Window className={styles.addNoteWindow}>
            <WindowTitle>Add a note to a word</WindowTitle>
            <Form noValidate control={control} onSubmit={handleSubmit(submitFormHndler)}>
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
                     disabled={isSubmitting || isAlertOk}
                     type="button"
                     icon={<BiShare />}
                     onClick={btnBackToAddWordHandler}
                  >
                     Back to "Add word"
                  </Button>

                  <Button
                     disabled={isSubmitting || isAlertOk}
                     type="submit"
                     icon={<BiPlus />}
                     hasPreloader
                     isSubmitting={isSubmitting || isAlertOk}
                  >
                     Add Word
                  </Button>
               </div>
            </Form>
         </Window>
      </>
   )
}
