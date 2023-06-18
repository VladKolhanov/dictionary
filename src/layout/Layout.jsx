import { Outlet } from 'react-router-dom'
import { Header } from '../components/header/Header'
import styles from './Layout.module.css'
import { DataProvider } from '../context/dictionaryContext'
import { Footer } from '../components/footer/Footer'

export const Layout = () => {
   return (
      <DataProvider>
         <div className={styles.layout}>
            <div className={styles.containier}>
               <Header />
               <main>
                  <Outlet />
               </main>
               {/* <Footer /> */}
            </div>
         </div>
      </DataProvider>
   )
}
