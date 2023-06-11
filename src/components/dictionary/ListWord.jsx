import styles from './ListWord.module.css'
import React, { useEffect, useState } from 'react'
import { deleteWord, getWordsFromDataBase, putChangeWord } from '../../api/json-server'
import { ItemWord } from './ItemWord'
import { Preloader } from '../../ui/Preloader'
import { Note } from './note/Note'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

export const ListWord = ({ onDisplayAlertOk, onDisplayAlertError }) => {
   const [wordsList, setWordsList] = useState(null)
   const [isLoadingData, setIsLoadingData] = useState(false)
   const [noteWord, setNoteWord] = useState(null)

   const navigate = useNavigate()

   const getNewData = async () => {
      try {
         setWordsList(await getWordsFromDataBase())
      } catch (error) {
         ////////////
      }
   }

   useEffect(() => {
      const fetchData = async () => {
         setIsLoadingData(true)
         await getNewData()
         setIsLoadingData(false)
      }

      fetchData()
   }, [])

   const onFavorite = async (data) => {
      await putChangeWord({
         ...data,
         isFavorite: !data.isFavorite,
      })

      getNewData()
   }

   const onDelet = async (id) => {
      try {
         await deleteWord(id)
         onDisplayAlertOk('Deleted', 3000)
         getNewData()
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
            {isLoadingData || (!wordsList && <Preloader className={styles.preloader} />)}

            {wordsList && wordsList.length === 0 && !isLoadingData && (
               <p className={styles.emptyListMessage}>
                  Please, press on the button "ADD NEW WORD" for add word into dictionary!
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
      </>
   )
}
