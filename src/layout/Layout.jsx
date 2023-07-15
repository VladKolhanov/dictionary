import { Outlet } from 'react-router-dom'
import { Header } from '../components/header/Header'
import styles from './Layout.module.css'
import { EnterFieldContextProvider } from '../context/EnterFieldContext'
import { Footer } from '../components/footer/Footer'

export const Layout = () => {
   return (
      <EnterFieldContextProvider>
         <div className={styles.layout}>
            <div className={styles.containier}>
               <Header />
               <main>
                  <Outlet />
               </main>
               {/* <Footer /> */}
            </div>
         </div>
      </EnterFieldContextProvider>
   )
}
