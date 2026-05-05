import './App.css'
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home"
import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import ResetOtp from './pages/ResetOtp';

function App(){
  return (
    <>
    <Navbar/>
    <Routes>
      
      <Route path='/' element={<Home />}/>
      <Route path='/signin' element={<Signin />}/>
      <Route path='/forgotpassword' element={  <ForgotPassword /> }/>
      <Route path='/resetpassword' element={  <ResetPassword /> }/>
      <Route path='/resetOtp' element={<ResetOtp/>}/>

    </Routes>
    </>
  )
}
export default App;
