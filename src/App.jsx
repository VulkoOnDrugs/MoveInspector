import { Route,Routes } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home';
import Favorites from './pages/Favorites'
import MovieDetails from "./components/MovieDetails"
import PeopleDetails from './components/PeopleDetails';

function App() {
 
  return (

    <>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/person/:id' element={<PeopleDetails/>}/>

        </Routes>

      </main>
    </>
    
  )
}

export default App
