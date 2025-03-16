import {Route,Routes} from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import MovieDetails from './components/MovieDetails'

function App(){
  return(
    <>
    <NavBar/>
    <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='/movie/:id' element={<MovieDetails/>}/>
      </Routes>
    

    </main>
    </>
  )
}

export default App