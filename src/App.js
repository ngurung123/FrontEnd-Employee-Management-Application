import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import CreateEmployeesComponent from './components/CreateEmployeesComponent';
import ListEmployeesComponent from './components/ListEmployeesComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import EditEmployeesComponent from "./components/EditEmployeesComponent";
import ViewEmployeesComponent from "./components/ViewEmployeesComponent";
import Login from "./Login/Login";
import Register from "./Login/Register";
import DateTime from "./misc/DateTime";

function App() {
  let location = useLocation();
  return (
    <div className='App'>
      {location.pathname !== '/login' ? <HeaderComponent /> : null}
      <div className="container">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/list' element={<ListEmployeesComponent />} />
          <Route path='/employees' element={<ListEmployeesComponent />} />
          <Route path='/add-employee' element={<CreateEmployeesComponent />} />
          <Route path='/edit-employee/:empID' element={<EditEmployeesComponent />} />
          <Route path='/view-employee/:empID' element={<ViewEmployeesComponent />} />
        </Routes>
      </div>
      {location.pathname !== '/login' ? <FooterComponent /> : null}
    </div>
  );
}

export default App;
