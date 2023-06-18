import styles from './Footer.module.css'

export const Footer = (props) => {
   return (
      <div className={styles.footer}>
         <p className={styles.text}>This pet-project developed by "Vladylsav Kolhanov"</p>
         <a className={styles.link} href="https://github.com/VladKolhanov">
            Link to GitHub "Vladyslav Kolhanov"
         </a>
      </div>
   )
}
