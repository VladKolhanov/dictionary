import styles from './ItemWord.module.css'
import { ButtonCircle } from '../../ui/ButtonCircle'
import { BsStar } from 'react-icons/bs'
import { BsStarFill } from 'react-icons/bs'
import { BiNotepad } from 'react-icons/bi'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { BiPencil } from 'react-icons/bi'

export const ItemWord = (props) => {
   const { wordEn, wordTr, sentenceEn, sentenceTr, id, isFavorite, onFavorite, onDelet } = props

   const sliceString = (string, length) =>
      string.length > length ? `${string.slice(0, length)} ...` : string

   return (
      <div className={styles.itemWord}>
         <div className={styles.itemContent}>
            <div className={styles.words}>{wordEn}</div>
            <div className={styles.words}>{wordTr}</div>
            <p className={styles.sentence}>{sliceString(sentenceEn, 35)}</p>
            <p className={styles.sentence}>{sliceString(sentenceTr, 35)}</p>
         </div>
         <div className={styles.actions}>
            <ButtonCircle type="button" favorite={isFavorite} onClick={() => onFavorite(props)}>
               {isFavorite ? <BsStarFill /> : <BsStar />}
            </ButtonCircle>
            <ButtonCircle type="button" onClick={() => onDelet(id)}>
               <MdOutlineDeleteForever />
            </ButtonCircle>
            <ButtonCircle type="button">
               <BiPencil />
            </ButtonCircle>
            <ButtonCircle type="button">
               <BiNotepad />
            </ButtonCircle>
         </div>
      </div>
   )
}
