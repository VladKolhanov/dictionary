import { Window } from './Window'
import styles from './Alert.module.css'

export const Alert = ({ children, error, ...props }) => (
   <Window className={error ? `${styles.alertError} ${styles.alert}` : styles.alert} {...props}>
      {children}
   </Window>
)
