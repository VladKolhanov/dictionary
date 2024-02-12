import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import { Home } from '../components/Home'
import { SelectGame } from '../components/game/SelectGame'
import { Dictionary } from '../components/dictionary/Dictionary'
import { AddWord } from '../components/dictionary/addWord/AddWord'
import { AddNote } from '../components/dictionary/addWord/AddNote'
import { PageNotFound } from '../components/PageNotFound'
import { Redate } from '../components/dictionary/redate/Redate'
import { SettingsGame } from '../components/game/GameSettings/SettingsGame'
import { PlayGame } from '../components/game/PlayGame/PlayGame'
import { ResultGame } from '../components/game/PlayResult/ResultGame'

export const routes = createBrowserRouter(
   createRoutesFromElements([
      <Route path="/" element={<Layout />}>
         <Route index element={<Home />} />
         <Route path="select-game" element={<SelectGame />} />
         <Route path="settings-game" element={<SettingsGame />} />
         <Route path="play-game" element={<PlayGame />} />
         <Route path="game-result" element={<ResultGame />} />
         <Route path="dictionary" element={<Dictionary />} />
         <Route path="dictionary/:wordId" element={<Redate />} />
         <Route path="/add-word" element={<AddWord />} />
         <Route path="/add-note" element={<AddNote />} />
      </Route>,
      <Route path="*" element={<PageNotFound />} />,
   ])
)
