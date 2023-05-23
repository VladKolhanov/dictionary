import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import styles from './Logo.module.css'

export const Logo = () => {
   return (
      <Link className={styles['logo-link']} to="/">
         <img className={styles['logo-img']} src={logo} alt="Logo" />
      </Link>
   )
}
