import styles from './AlertAddWord.module.css'
import { BiError } from 'react-icons/bi'
import { GiCheckMark } from 'react-icons/gi'
import { Window } from '../../ui/Window'

export const AlertAddWord = ({ variant, message, ...props }) => {
   let variantStyle

   if (variant === 'ok') variantStyle = `${styles.alert}`
   if (variant === 'error') variantStyle = `${styles.alertError} ${styles.alert}`

   return (
      <Window className={variantStyle} {...props}>
         {variant === 'ok' && <GiCheckMark />}
         {variant === 'error' && <BiError />}
         <p>{message}</p>
      </Window>
   )
}
