import styles from './AlertColor.module.css'

export const AlertColor = ({ children, error, ...props }) => (
   <div className={error ? `${styles.alertError} ${styles.alert}` : styles.alert} {...props}>
      {children}
   </div>
)
