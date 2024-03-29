import styles from './ItemWord.module.css'
import { ButtonCircle } from '../../ui/ButtonCircle'
import { BsStar } from 'react-icons/bs'
import { BsStarFill } from 'react-icons/bs'
import { BiNotepad } from 'react-icons/bi'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { BiPencil } from 'react-icons/bi'

export const ItemWord = (props) => {
   const {
      wordEn,
      wordTr,
      sentenceEn,
      sentenceTr,
      hasNote,
      note,
      id,
      isFavorite,
      onFavorite,
      onDelet,
      onOpenNoteWord,
      onOpenRedateWindow,
   } = props

   return (
      <div className={styles.itemWord}>
         <div className={styles.itemContent}>
            <div className={styles.words}>{wordEn}</div>
            <div className={styles.words}>{wordTr}</div>
            <p className={styles.sentence}>{sentenceEn}</p>
            <p className={styles.sentence}>{sentenceTr}</p>
         </div>
         <div className={styles.actions}>
            <ButtonCircle
               icon={isFavorite ? <BsStarFill /> : <BsStar />}
               type="button"
               active={isFavorite}
               onClick={() => onFavorite(props)}
            ></ButtonCircle>
            <ButtonCircle
               icon={<MdOutlineDeleteForever />}
               type="button"
               onClick={() => onDelet(id)}
            ></ButtonCircle>
            <ButtonCircle
               icon={<BiPencil />}
               type="button"
               onClick={() => onOpenRedateWindow(id)}
            ></ButtonCircle>
            <ButtonCircle
               icon={<BiNotepad />}
               type="button"
               disabled={!hasNote}
               onClick={() => onOpenNoteWord({ wordEn, note })}
            ></ButtonCircle>
         </div>
      </div>
   )
}
