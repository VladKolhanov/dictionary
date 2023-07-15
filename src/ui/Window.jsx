import { forwardRef } from 'react'
import styles from './Window.module.css'

export const Window = forwardRef(({ children, className, ...props }, ref) => (
   <div
      ref={ref}
      className={className ? `${styles.window} ${className ? className : ''}` : styles.window}
      {...props}
   >
      {children}
   </div>
))
