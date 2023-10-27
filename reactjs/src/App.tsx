import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Addpage from './Pages/Addpage';
import Editpage from './Pages/Editpage';
import Search from './Pages/Search';
import Select from './Pages/Select';
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Addpage />}></Route>
              <Route path="/add" element={<Addpage />}></Route>
              <Route path="/edit" element={<Editpage />}></Route>
              <Route path="/search" element={<Search />}></Route>
              <Route path="/select" element={<Select />}></Route>
            </Routes>
          </BrowserRouter>
          
        </header>
      </div>
    </Provider>
  );
}

export default App;
