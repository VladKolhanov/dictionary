import styles from './Dictionary.module.css'
import { useNavigate } from 'react-router-dom'
import { ListWord } from './ListWord'
import { Button } from '../../ui/Button'
import { AlertDeleted } from './AlertDeleted'
import { useAlert } from '../../hook/useAlert'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'

export const Dictionary = (props) => {
   const [totalWords, setTotalWords] = useState(null)
   const [searchInput, setSearchInput] = useState('')

   const navigate = useNavigate()

   const [alertOk, displayAlertOk] = useAlert()
   const [alertError, displayAlertError] = useAlert()

   const handleChangeInput = async (e) => setSearchInput(e.target.value)

   return (
      <>
         {alertOk && <AlertDeleted message={alertOk} variant="ok" />}
         {alertError && <AlertDeleted message={alertError} variant="error" />}

         <div className={styles.actionsPanel}>
            <Button icon={<BiPlus />} onClick={() => navigate('/add-word')}>
               add new word
            </Button>
            <input
               className={styles.searchField}
               onChange={handleChangeInput}
               value={searchInput}
               placeholder="Search word ..."
            />
            <p className={styles.counter}>
               <span>{totalWords}</span> words found in the dictionary
            </p>
         </div>

         <ListWord
            searchInput={searchInput}
            onSetTotalWords={setTotalWords}
            onDisplayAlertOk={displayAlertOk}
            onDisplayAlertError={displayAlertError}
         />
      </>
   )
}
