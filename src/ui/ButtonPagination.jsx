import styles from './ButtonPagination.module.css'

export const ButtonPagination = ({ children, icon, currentPage, id, ...props }) => (
   <button
      className={`${styles.button} ${currentPage === id ? styles.currentPage : ''}`}
      {...props}
   >
      {icon}
      {children}
   </button>
)
