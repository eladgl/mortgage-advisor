import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  ContactUs,
  Over100kLoan,
  FewLoans,
  OneLoan,
  CheckBestMortgage,
  HomePage,
  Register,
  Recover,
  LoginPage,
  ChangePass,
  ResetPassword,
  PageNotFound,
} from "./pages";
import NavBar from "./components/navBar";
import styled from "styled-components";
import "./index.css";
import TopNavBar from "./components/topNavBar";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/privateRoute";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: calc(100vh - 64px); 
`;

const Wrapper = styled.div`
  background-image: linear-gradient(161deg, #265ca5, #0e346b);
`;

const App = () => {
  return (
    <Wrapper>
      <Router>
        <AuthProvider>
          <TopNavBar />
          <Layout className="h-screen mt-24">
            <div className="hidden md:block">
              <NavBar />
            </div>
            <div className="w-full h-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<Register />} />
                <Route path="/recover" element={<Recover />} />
                <Route path="/resetPassword/:token" element={<ResetPassword />} />
                <Route path="/mortgages/new/checkBest" element={<PrivateRoute><CheckBestMortgage /></PrivateRoute>} />
                <Route path="/loans/normal/upTo100k/one" element={<PrivateRoute><OneLoan /></PrivateRoute>} />
                <Route path="/loans/normal/upTo100k/few" element={<PrivateRoute><FewLoans /></PrivateRoute>} />
                <Route path="/loans/normal/over100k" element={<PrivateRoute><Over100kLoan /></PrivateRoute>} />
                <Route path="/changePassword" element={<PrivateRoute><ChangePass /></PrivateRoute>} />
                <Route path="*" element={<PageNotFound />} /> 
              </Routes>
            </div>
          </Layout>
        </AuthProvider>
      </Router>
    </Wrapper>
  );
};

export default App;