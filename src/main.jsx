import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Apps from './App.jsx'
// import ToDoList from './ToDo.jsx'
// import MyAPI from './API.jsx';
import RouterApp from './Routing.jsx'
// import MyCar from './Cars.jsx'


const myelement = <h1>i write jsx</h1>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterApp />

  </StrictMode>,
)