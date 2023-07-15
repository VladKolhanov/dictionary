import styles from './AddWord.module.css'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { Field } from '../../../ui/Field'
import { Form } from '../../../ui/Form'
import { Window } from '../../../ui/Window'
import { Button } from '../../../ui/Button'
import { BiShare } from 'react-icons/bi'
import { TbShare3 } from 'react-icons/tb'
import { BiPlus } from 'react-icons/bi'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { addWordIntoDictionary } from '../../../api/json-server'
import { Switcher } from '../../../ui/Switcher'
import { WindowTitle } from '../../../ui/WindowTitle'
import { useData } from '../../../context/EnterFieldContext'
import { useAlert } from '../../../hook/useAlert'
import { AlertAddWord } from '../AlertAddWord'

export const AddWord = (props) => {
   const { data, setValues } = useData()
   const [alertOk, displayAlertOk] = useAlert()
   const [alertError, displayAlertError] = useAlert()

   const schema = yup.object({
      wordEn: yup.string().trim().lowercase().required('Field should be filled'),
      wordTr: yup.string().trim().lowercase().required('Field should be filled'),
      sentenceEn: yup.string().trim().required('Field should be filled'),
      sentenceTr: yup.string().trim().required('Field should be filled'),
      hasNote: yup.boolean(),
   })

   const {
      register,
      handleSubmit,
      control,
      reset,
      formState: { errors, isSubmitting, isValid },
      watch,
   } = useForm({
      defaultValues: {
         wordEn: data.wordEn,
         wordTr: data.wordTr,
         sentenceEn: data.sentenceEn,
         sentenceTr: data.sentenceTr,
         hasNote: data.hasNote,
      },
      mode: 'onBlur',
      resolver: yupResolver(schema),
   })

   const navigate = useNavigate()

   const btnBackHandler = () => {
      reset()
      setValues()
      navigate('/dictionary')
   }

   const formSubmitHandler = async (data) => {
      try {
         if (hasNote) {
            setValues({ ...data, isFavorite: false })
            return navigate('/add-note')
         }

         await addWordIntoDictionary({ ...data, isFavorite: false })

         reset()
         setValues()
         displayAlertOk('The word was successfully added to the dictionary.', 2500)
      } catch (error) {
         displayAlertError(error.message, 2500)
      }
   }

   const hasNote = watch('hasNote')

   return (
      <>
         {alertOk && <AlertAddWord message={alertOk} variant="ok" />}
         {alertError && <AlertAddWord message={alertError} variant="error" />}

         <Window className={`${styles.addWordWindow} ${data.wordEn ? styles.back : ''}`}>
            <WindowTitle>Add word into dictionary</WindowTitle>

            <Form control={control} noValidate onSubmit={handleSubmit(formSubmitHandler)}>
               <Field
                  label="Word (english)"
                  type="text"
                  hasError={!!errors.wordEn}
                  error={errors.wordEn?.message}
                  required
                  maxLength="30"
                  {...register('wordEn')}
               />
               <Field
                  label="Word (translate)"
                  type="text"
                  hasError={!!errors.wordTr}
                  error={errors.wordTr?.message}
                  required
                  maxLength="30"
                  {...register('wordTr')}
               />
               <Field
                  label="Sentence example (english)"
                  type="text"
                  hasError={!!errors.sentenceEn}
                  error={errors.sentenceEn?.message}
                  required
                  maxLength="80"
                  {...register('sentenceEn')}
               />
               <Field
                  label="Sentence example (translate)"
                  type="text"
                  hasError={!!errors.sentenceTr}
                  error={errors.sentenceTr?.message}
                  required
                  maxLength="80"
                  {...register('sentenceTr')}
               />

               <Switcher {...register('hasNote')}>Do you want to add a note to this word?</Switcher>

               <div className={styles.actions}>
                  <Button
                     disabled={isSubmitting}
                     type="button"
                     onClick={btnBackHandler}
                     icon={<BiShare />}
                  >
                     Back to Dictionary
                  </Button>

                  {hasNote && (
                     <Button
                        disabled={!isValid}
                        type="submit"
                        hasPreloader
                        isSubmitting={isSubmitting}
                        icon={<TbShare3 />}
                     >
                        To add a note
                     </Button>
                  )}
                  {!hasNote && (
                     <Button
                        disabled={!isValid}
                        type="submit"
                        hasPreloader
                        isSubmitting={isSubmitting}
                        icon={<BiPlus />}
                     >
                        Add Word
                     </Button>
                  )}
               </div>
            </Form>
         </Window>
      </>
   )
}
