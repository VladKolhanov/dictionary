import styles from './WindowTitle.module.css'

export const WindowTitle = ({ children, ...props }) => (
   <h2 className={styles.title} {...props}>
      {children}
   </h2>
)
