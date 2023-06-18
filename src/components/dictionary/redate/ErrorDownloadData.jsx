import styles from './ErrorDownloadData.module.css'
import { Button } from '../../../ui/Button'
import { BiShare } from 'react-icons/bi'
import { BsExclamationTriangleFill } from 'react-icons/bs'
import { Window } from '../../../ui/Window'
import { useNavigate } from 'react-router-dom'

export const ErrorDownloadData = ({ message }) => {
   const navigate = useNavigate()
   return (
      <Window className={styles.window}>
         <BsExclamationTriangleFill className={styles.exclamation} />
         <p className={styles.message}>{message}</p>
         <Button icon={<BiShare />} className={styles.button} onClick={() => navigate(-1)}>
            Back to Dictionary
         </Button>
      </Window>
   )
}
