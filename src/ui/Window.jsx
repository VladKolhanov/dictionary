import styles from './Window.module.css'

export const Window = ({ children, className, ...props }) => (
   <div className={className ? `${styles.window} ${className}` : styles.window} {...props}>
      {children}
   </div>
)
