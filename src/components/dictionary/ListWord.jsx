import styles from './ListWord.module.css'
import React, { useEffect, useState } from 'react'
import { deleteWord, getWordsFromDataBase, putChangeWord, searchWord } from '../../api/json-server'
import { ItemWord } from './ItemWord'
import { Preloader } from '../../ui/Preloader'
import { Note } from './note/Note'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { BiError } from 'react-icons/bi'
import { Pagination } from './Pagination'

export const ListWord = ({
   onDisplayAlertOk,
   onDisplayAlertError,
   onSetTotalWords,
   searchInput,
}) => {
   const [wordsList, setWordsList] = useState(null)
   const [limitWordOnPage] = useState(15)
   const [dictionaryInfo, setDictionaryInfo] = useState({})
   const [isLoadingData, setIsLoadingData] = useState(false)
   const [noteWord, setNoteWord] = useState(null)
   const [crashLoadDataErrorMessage, setCrashLoadDataErrorMessage] = useState('')
   const [searchWordErrorMessage, setSearchWordErrorMessage] = useState('')
   const [currentPage, setCurrentPage] = useState(1)

   const navigate = useNavigate()

   useEffect(() => {
      setIsLoadingData(true)
      getNewData(currentPage)
      setIsLoadingData(false)
   }, [currentPage, searchInput])

   const getNewData = async (page, limit = limitWordOnPage) => {
      try {
         const { data, dictionaryInfo } = !searchInput
            ? await getWordsFromDataBase(page, limit)
            : await searchWord(page, limit, searchInput)

         setWordsList(data)
         setDictionaryInfo(dictionaryInfo)
         onSetTotalWords(dictionaryInfo.totalCount)

         data.length === 0
            ? setSearchWordErrorMessage('Sorry, nothing was found in the dictionary')
            : setSearchWordErrorMessage('')
      } catch (error) {
         setCrashLoadDataErrorMessage(error.message)
         setIsLoadingData(false)
         setWordsList(false)
      }
   }

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

            {wordsList && wordsList.length === 0 && !isLoadingData && !searchInput && (
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

            {searchWordErrorMessage && wordsList.length === 0 && (
               <p className={styles.searchError}>{searchWordErrorMessage}</p>
            )}
         </div>

         {!crashLoadDataErrorMessage &&
            !searchWordErrorMessage &&
            dictionaryInfo.totalCount > limitWordOnPage && (
               <Pagination
                  sumPages={dictionaryInfo.allPages}
                  currentPage={currentPage}
                  onSetCurrentPage={setCurrentPage}
               />
            )}
      </>
   )
}
