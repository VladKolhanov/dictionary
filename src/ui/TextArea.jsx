import { forwardRef } from 'react'
import styles from './TextArea.module.css'

export const TextArea = forwardRef(({ children, ...props }, ref) => (
   <textarea ref={ref} className={styles.textarea} {...props}>
      {children}
   </textarea>
))
