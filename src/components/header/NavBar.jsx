import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

export const NavBar = () => {
   const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '')
   return (
      <nav className={styles.navBar}>
         <NavLink className={activeLink} to="dictionary">
            Dictionary
         </NavLink>
         <NavLink className={activeLink} to="game">
            Game
         </NavLink>
      </nav>
   )
}
