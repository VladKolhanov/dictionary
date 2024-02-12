import styles from './SelectGame.module.css'
import { Window } from '../../ui/Window'
import { LinkSelectGame } from './LinkSelectGame'
import { WindowTitle } from '../../ui/WindowTitle'

export const SelectGame = (props) => {
   return (
      <Window className={styles.window}>
         <WindowTitle>Select Game</WindowTitle>
         <LinkSelectGame to={'/settings-game?g=translateWord'}>Translate Word</LinkSelectGame>
         <LinkSelectGame to={'/settings-game?g=translateSentence'}>
            Translate Sentence
         </LinkSelectGame>
      </Window>
   )
}
