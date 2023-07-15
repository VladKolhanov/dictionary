import styles from './ListWord.module.css'
import React, { useEffect, useState } from 'react'
import { deleteWord, getWordsFromDataBase, putChangeWord } from '../../api/json-server'
import { ItemWord } from './ItemWord'
import { Preloader } from '../../ui/Preloader'
import { Note } from './note/Note'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { BiError } from 'react-icons/bi'
import { Pagination } from './Pagination'

export const ListWord = ({ onDisplayAlertOk, onDisplayAlertError, onSetTotalWords }) => {
   const [wordsList, setWordsList] = useState(null)
   const [dictionaryInfo, setDictionaryInfo] = useState({})
   const [isLoadingData, setIsLoadingData] = useState(false)
   const [noteWord, setNoteWord] = useState(null)
   const [crashLoadDataErrorMessage, setCrashLoadDataErrorMessage] = useState('')
   const [currentPage, setCurrentPage] = useState(1)

   const navigate = useNavigate()

   const getNewData = async (page, limit = 15) => {
      try {
         const { data, dictionaryInfo } = await getWordsFromDataBase(page, limit)
         setWordsList(data)
         setDictionaryInfo(dictionaryInfo)
         onSetTotalWords(dictionaryInfo.totalCount)
      } catch (error) {
         setCrashLoadDataErrorMessage(error.message)
         setIsLoadingData(false)
         setWordsList(false)
      }
   }

   useEffect(() => {
      setIsLoadingData(true)
      getNewData(currentPage)
      setIsLoadingData(false)
   }, [currentPage])

   const onFavorite = async (data) => {
      try {
         await putChangeWord({
            ...data,
            isFavorite: !data.isFavorite,
         })
      } catch (error) {
         onDisplayAlertError(error.message, 3000)
      }

      getNewData(currentPage)
   }

   const onDelet = async (id) => {
      try {
         await deleteWord(id)
         onDisplayAlertOk('Deleted', 3000)
         getNewData(currentPage)
      } catch (error) {
         onDisplayAlertError(error.message, 3000)
      }
   }

   const onOpenNoteWord = (data) => setNoteWord(data)
   const onCloseNoteWord = () => setNoteWord(null)

   const onOpenRedateWindow = (id) => navigate(`/dictionary/${id}`)

   return (
      <>
         {noteWord &&
            createPortal(
               <Note {...noteWord} onCloseNoteWord={onCloseNoteWord} />,
               document.getElementById('popUp')
            )}

         <div className={styles.wordList}>
            {isLoadingData && <Preloader className={styles.preloader} />}

            {wordsList && wordsList.length === 0 && !isLoadingData && (
               <p className={styles.listMessage}>
                  Please, press on the button "ADD NEW WORD" for add word into dictionary!
               </p>
            )}

            {crashLoadDataErrorMessage && (
               <p className={`${styles.listMessage} ${styles.error}`}>
                  <BiError />
                  {crashLoadDataErrorMessage}
               </p>
            )}

            {!!wordsList &&
               wordsList.map((item) => (
                  <ItemWord
                     key={item.id}
                     onFavorite={onFavorite}
                     onDelet={onDelet}
                     onOpenNoteWord={onOpenNoteWord}
                     onOpenRedateWindow={onOpenRedateWindow}
                     {...item}
                  />
               ))}
         </div>

         {!crashLoadDataErrorMessage && (
            <Pagination
               dictionaryInfo={dictionaryInfo}
               currentPage={currentPage}
               onSetCurrentPage={setCurrentPage}
            />
         )}
      </>
   )
}
