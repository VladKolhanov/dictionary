import styles from './AlertDeleted.module.css'
import { BiError } from 'react-icons/bi'
import { GiCheckMark } from 'react-icons/gi'
import { AlertColor } from '../../ui/AlertColor'

export const AlertDeleted = ({ children, error, ok, ...props }) => {
   return (
      <>
         {ok && (
            <AlertColor >
               <GiCheckMark />
               <p>Deleted</p>
            </AlertColor>
         )}

         {error && (
            <AlertColor error>
               <BiError />
               <p>Not Deleted</p>
            </AlertColor>
         )}
      </>
   )
}
