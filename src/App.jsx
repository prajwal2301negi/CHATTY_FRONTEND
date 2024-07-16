import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ChatRoom from './Pages/ChatRoom';
// import Home from './Pages/Home'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
    {/* <Route path='/' element={<Home/>}/> */}
      <Route path='/chatroom' element={<ChatRoom/>}/>
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
