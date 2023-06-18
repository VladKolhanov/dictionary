import styles from './ButtonCircle.module.css'

export const ButtonCircle = ({ children, active, icon, id, ...props }) => {
   return (
      <button className={`${styles.button} ${active ? styles.favorite : ''} `} {...props}>
         {icon}
         {children}
      </button>
   )
}
