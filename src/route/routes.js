import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import { Home } from '../components/home/Home'
import { Game } from '../components/game/Game'
import { Dictionary } from '../components/dictionary/Dictionary'
import { AddWord } from '../components/dictionary/AddWord'

export const routes = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Layout />}>
         <Route index element={<Home />} />
         <Route path="game" element={<Game />} />
         <Route path="dictionary" element={<Dictionary />} />
         <Route path="/add-word" element={<AddWord />} />
      </Route>
   )
)
