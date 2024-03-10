
import './App.css';
import Categorie from './components/Categorie';
import { Routes, Route } from 'react-router-dom';
import Categorieprovider from './components/Categorieprovider';
import Provieder from './components/Provider';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import ProviderForm from './components/Providerform';


function App() {
  return (
      <>
         <Routes>
               <Route exact path='/' element={<Categorie/>} />
               <Route exact path='/categoryProviders/:id' element={<Categorieprovider/>} />
               <Route exact path='/providers' element={<Provieder/>} />
               <Route exact path='/profiles/:id' element={<Profile/>} />
               <Route exact path='/login' element={<Login/>} />
               <Route exact path='/register' element={<Register/>} />
               <Route exact path='/profilecreate' element={<ProviderForm/>} />
          </Routes>
    </>
  );
}

export default App;
