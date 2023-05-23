import styles from './AddWord.module.css'

export const AddWord = (props) => {
   return (
      <form className={styles.formAddWord} action="#" method="#">
         <div className={styles.field}>
            <label htmlFor="word">Word</label>
            <input type="text" name="word" />
         </div>
      </form>
   )
}
