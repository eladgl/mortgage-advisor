import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  ContactUs,
  Over100kLoan,
  FewLoans,
  OneLoan,
  UpTo100kLoan,
  NormalMortgage,
  CheckBestMortgage,
  NewMortgage,
  HomePage,
  Register,
} from "./pages";
import { pageTypeSelector } from "./pages/pageTypeSelector";

import NavBar from "./components/navBar";
import styled from "styled-components";
import "./index.css";
import TopNavBar from "./components/topNavBar";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
`;

const App = () => {
  return (
    <div className="bg-gray-600">
      <Router>
        <TopNavBar />
        <Layout className="mt-28 h-screen">
          <div className="hidden sm:block">
            <NavBar />
          </div>
          <div className="w-full h-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/newMortgage" element={<NewMortgage />} />
              <Route
                path="/checkBestMortgage"
                element={<CheckBestMortgage />}
              />
              <Route path="/normalMortgage" element={<NormalMortgage />} />
              <Route path="/upTo100kLoan" element={<UpTo100kLoan />} />
              <Route path="/oneLoan" element={<OneLoan />} />
              <Route path="/fewLoans" element={<FewLoans />} />
              <Route path="/over100kLoan" element={<Over100kLoan />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
