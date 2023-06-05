import styles from './Form.module.css'

export const Form = ({ children, ...props }) => (
   <form className={styles.form} {...props}>
      {children}
   </form>
)
