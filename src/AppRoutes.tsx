import React from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import ReferenceDataTable from './Components/ReferenceDataTable';
import RTOtable from './Components/RTOtable';
import MasterData from './Components/MasterData/masterData';

export default function AppRoutes() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rtotable" element={<RTOtable/>} />
        <Route path="/master-data/:id" element={<MasterData/>} />


        {/* <Route
              path="/master-data/:id"
              element={
                
                  <ReferenceDataTable />
                
              }
            /> */}
        </Routes>
    </Router>
    // <div>
    //   App Works
    // </div>
  )
}
