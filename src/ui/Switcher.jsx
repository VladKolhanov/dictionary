import { forwardRef } from 'react'
import styles from './Switcher.module.css'

export const Switcher = forwardRef(({ children, ...props }, ref) => (
   <div className={styles.switchBox}>
      <label className={styles.switcher}>
         <input ref={ref} type="checkbox" {...props} />
         <span></span>
      </label>
      {children}
   </div>
))
