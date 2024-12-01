import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Address from './components/Address';
import Challenge from './components/Challenge';
import Start from './components/Start';
import Map from './components/Map';
import Map2 from './components/Map2';
import Code from './components/Code';
import Select from './components/Select';
import Login from './components/Login'
import Access from './components/Access'
import Marketplace from './components/Marketplace'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/address" element={<Address />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/start" element={<Start />} />
        <Route path="/map" element={<Map />} />
        <Route path="/map2" element={<Map2 />} />
        <Route path="/code" element={<Code />} />
        <Route path="/select" element={<Select />} />
        <Route path="/login" element={<Login />} />
        <Route path="/access" element={<Access />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </div>
  );
};

export default App;
