import { BiShare } from 'react-icons/bi'
import { Button } from '../../../ui/Button'
import { Window } from '../../../ui/Window'
import { WindowTitle } from '../../../ui/WindowTitle'
import styles from './Note.module.css'

export const Note = ({ wordEn, note, onCloseNoteWord, ...props }) => {
   return (
      <div className={styles.modalWindow}>
         <div className={styles.overlay} onClick={() => onCloseNoteWord()}></div>
         <Window className={styles.box} {...props}>
            <WindowTitle>Note to "{wordEn}"</WindowTitle>
            <p>{note}</p>
            <Button icon={<BiShare />} onClick={() => onCloseNoteWord()}>
               Back to dictionary
            </Button>
         </Window>
      </div>
   )
}
