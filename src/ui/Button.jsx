import styles from './Button.module.css'
import { Preloader } from './Preloader'

export const Button = ({ hasPreloader, isSubmitting, children, icon, className, ...props }) => (
   <>
      {hasPreloader && isSubmitting ? (
         <Preloader />
      ) : (
         <button className={className ? `${styles.button} ${className}` : styles.button} {...props}>
            {icon}
            {children}
         </button>
      )}
   </>
)
