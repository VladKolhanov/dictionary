import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import { Home } from '../components/Home'
import { Game } from '../components/game/Game'
import { Dictionary } from '../components/dictionary/Dictionary'
import { AddWord } from '../components/dictionary/addWord/AddWord'
import { AddNote } from '../components/dictionary/addWord/AddNote'
import { PageNotFound } from '../components/PageNotFound'
import { Redate } from '../components/dictionary/redate/Redate'

export const routes = createBrowserRouter(
   createRoutesFromElements([
      <Route path="/" element={<Layout />}>
         <Route index element={<Home />} />
         <Route path="game" element={<Game />} />
         <Route path="dictionary" element={<Dictionary />} />
         <Route path="dictionary/:wordId" element={<Redate />} />
         <Route path="/add-word" element={<AddWord />} />
         <Route path="/add-note" element={<AddNote />} />
      </Route>,
      <Route path="*" element={<PageNotFound />} />,
   ])
)
