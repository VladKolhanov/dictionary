import styles from './ButtonCircle.module.css'

export const ButtonCircle = ({ children, favorite, icon, ...props }) => {
   return (
      <button className={`${styles.button} ${favorite ? styles.favorite : ''}`} {...props}>
         {icon}
         {children}
      </button>
   )
}
