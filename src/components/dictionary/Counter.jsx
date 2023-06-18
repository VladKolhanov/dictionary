import styles from './Counter.module.css'

export const Counter = ({ totalWords }) => {
   return (
      <div className={styles.counter}>
         <span> {totalWords} </span>
         <p>Word into dictionary!</p>
      </div>
   )
}
