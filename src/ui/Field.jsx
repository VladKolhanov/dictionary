import React from 'react'
import styles from './Field.module.css'

export const Field = React.forwardRef(({ label, hasError, error, ...props }, ref) => (
   <label className={hasError ? `${styles.field} ${styles.fieldError}` : styles.field}>
      <input ref={ref} {...props} />
      <span>{label}</span>
      {hasError && <p className={styles.textError}>{error}</p>}
   </label>
))
