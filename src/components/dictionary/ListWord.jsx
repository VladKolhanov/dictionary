import styles from './ListWord.module.css'
import { useEffect, useState } from 'react'
import { deleteWord, getWordsFromDataBase, putFavoriteWord } from '../../api/json-server'
import { ItemWord } from './ItemWord'
import { Preloader } from '../../ui/Preloader'

export const ListWord = ({ onDisplayAlertOk, onDisplayAlertError }) => {
   const [wordsList, setWordsList] = useState(null)
   const [isLoadingData, setIsLoadingData] = useState(false)

   const getNewData = async () => setWordsList(await getWordsFromDataBase())

   useEffect(() => {
      const fetchData = async () => {
         setIsLoadingData(true)
         await getNewData()
         setIsLoadingData(false)
      }

      const response = fetchData()
   }, [])

   const onFavorite = async (data) => {
      await putFavoriteWord({
         ...data,
         isFavorite: !data.isFavorite,
      })
      getNewData()
   }

   //  const onDelet = async (id) => {
   //     await deleteWord(id)
   //     onDisplayAlertOk(3000)
   //     getNewData()
   //  }

   const onDelet = async (id) => {
      try {
         await deleteWord(id)
         onDisplayAlertOk(3000)
         getNewData()
      } catch (error) {
         onDisplayAlertError(3000)
      }
   }

   return (
      <div className={styles.wordList}>
         {isLoadingData || (!wordsList && <Preloader className={styles.preloader} />)}

         {wordsList && wordsList.length === 0 && !isLoadingData && (
            <p className={styles.emptyListMessage}>
               Please, press on the button "Add new Word" for add word into dictionary!
            </p>
         )}

         {!!wordsList &&
            wordsList.map((item) => (
               <ItemWord key={item.id} onFavorite={onFavorite} onDelet={onDelet} {...item} />
            ))}
      </div>
   )
}
