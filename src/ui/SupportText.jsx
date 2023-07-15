import styles from './SupportText.module.css'
import React from 'react'

export const SupportText = ({ children, ...props }) => {
   return (
      <p className={styles.supportInfo} {...props}>
         {children}
      </p>
   )
}
