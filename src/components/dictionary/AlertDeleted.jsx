import styles from './AlertDeleted.module.css'
import { BiError } from 'react-icons/bi'
import { GiCheckMark } from 'react-icons/gi'

export const AlertDeleted = ({ variant, message, ...props }) => {
   let variantStyle

   if (variant === 'ok') variantStyle = `${styles.alert}`

   if (variant === 'error') variantStyle = `${styles.alertError} ${styles.alert}`

   return (
      <div className={variantStyle} {...props}>
         {variant === 'ok' && <GiCheckMark />}
         {variant === 'error' && <BiError />}
         <p>{message}</p>
      </div>
   )
}
