import styles from './Dictionary.module.css'
import { useNavigate } from 'react-router-dom'
import { ListWord } from './ListWord'
import { Button } from '../../ui/Button'
import { AlertDeleted } from './AlertDeleted'
import { useAlert } from '../../hook/useAlert'
import { BiPlus } from 'react-icons/bi'
import { Counter } from './Counter'
import { useState } from 'react'

export const Dictionary = (props) => {
   const [totalWords, setTotalWords] = useState(null)

   const navigate = useNavigate()

   const [alertOk, displayAlertOk] = useAlert()
   const [alertError, displayAlertError] = useAlert()

   return (
      <>
         <Counter totalWords={totalWords} />

         {alertOk && <AlertDeleted message={alertOk} variant="ok" />}
         {alertError && <AlertDeleted message={alertError} variant="error" />}

         <div className={styles.actions}>
            <Button icon={<BiPlus />} onClick={() => navigate('/add-word')}>
               add new word
            </Button>
         </div>
         <ListWord
            onSetTotalWords={setTotalWords}
            onDisplayAlertOk={displayAlertOk}
            onDisplayAlertError={displayAlertError}
         />
      </>
   )
}
