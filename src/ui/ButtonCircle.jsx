import styles from './ButtonCircle.module.css'

export const ButtonCircle = ({ children, favorite, ...props }) => {
   return (
      <button className={`${styles.button} ${favorite ? styles.favorite : ''}`} {...props}>
         {children}
      </button>
   )
}
