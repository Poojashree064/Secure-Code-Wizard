import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './index.css';


//function App()
//{
  //return(
    //<h1>REact app</h1>
  //)
//}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
