import { Outlet } from 'react-router-dom'
import { Header } from '../components/header/Header'
import styles from './Layout.module.css'
import { EnterFieldContextProvider } from '../context/EnterFieldContext'
import { SettingsGameProvider } from '../context/SettingsGameContext'
import { ResultGameProvider } from '../context/ResultGameContext'

export const Layout = () => {
   return (
      <EnterFieldContextProvider>
         <SettingsGameProvider>
            <ResultGameProvider>
               <div className={styles.layout}>
                  <div className={styles.containier}>
                     <Header />
                     <main>
                        <Outlet />
                     </main>
                  </div>
               </div>
            </ResultGameProvider>
         </SettingsGameProvider>
      </EnterFieldContextProvider>
   )
}
