import styles from './Button.module.css'
import { Preloader } from './Preloader'

export const Button = ({ hasPreloader, isSubmitting, children, icon, ...props }) => (
   <>
      {hasPreloader && isSubmitting ? (
         <Preloader />
      ) : (
         <button className={styles.button} {...props}>
            {icon}
            {children}
         </button>
      )}
   </>
)
