import { Route, BrowserRouter, Routes , Router } from "react-router-dom";
import './App.css'
import Main from "./components/MainPage";
import { useState } from "react";
import Inventory from "./components/Inventory";
import Registration from "./components/Registration";
import LogIn from "./components/Login";
import ItemPage from "./components/Item";
import AdminPage from "./components/AdminPage";


function App() {
  const body = document.getElementsByTagName("body")
  const [theme , setTheme] = useState(false)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/inv/:id" element={<Inventory/>}/>
          <Route path="/inv/:id/item/:itemid" element={<ItemPage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/" element={<Main/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/login" element={<LogIn/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
