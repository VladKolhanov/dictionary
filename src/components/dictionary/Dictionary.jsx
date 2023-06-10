import styles from './Dictionary.module.css'
import { useNavigate } from 'react-router-dom'
import { ListWord } from './ListWord'
import { Button } from '../../ui/Button'
import { AlertDeleted } from './AlertDeleted'
import { useAlert } from '../../hook/useAlert'

export const Dictionary = (props) => {
   const navigate = useNavigate()

   const [stateAlertOk, displayAlertOk] = useAlert()
   const [stateAlertError, displayAlertError] = useAlert()

   return (
      <>
         {stateAlertOk && <AlertDeleted ok />}
         {stateAlertError && <AlertDeleted error />}
         <div className={styles.actions}>
            <Button onClick={() => navigate('/add-word')}>add new word</Button>
         </div>
         <ListWord onDisplayAlertOk={displayAlertOk} onDisplayAlertError={displayAlertError} />
      </>
   )
}
