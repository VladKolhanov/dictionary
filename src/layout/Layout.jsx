import { Outlet } from 'react-router-dom'
import { Header } from '../components/header/Header'
import styles from './Layout.module.css'

export const Layout = () => {
   return (
      <div className={styles.layout}>
         <div className={styles.containier}>
            <Header />
            <main>
               <Outlet />
            </main>
         </div>
      </div>
   )
}
