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
import Footer from "./components/footer";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Ensures the wrapper takes at least the full height of the viewport
  background-image: linear-gradient(161deg, #265ca5, #0e346b);
`;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1; // Allows the layout to expand and fill the available space
  width: 100%;
  background-color: #f4f7fa;
`;

const App = () => {
  return (
    <>
    <Wrapper>
      <Router>
        <AuthProvider>
          <TopNavBar />
          <Layout className="h-screen mt-24 overflow-x-hidden">
            <div className="hidden md:block">
              <NavBar />
            </div>
            <div className="w-full h-full ">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<Register />} />
                <Route path="/recover" element={<Recover />} />
                <Route path="/resetPassword/:token" element={<ResetPassword />} />
                <Route path="/mortgages/new/checkBest" element={<CheckBestMortgage />} />
                <Route path="/loans/normal/upTo100k/one" element={<OneLoan />} />
                <Route path="/loans/normal/upTo100k/few" element={<FewLoans />} />
                <Route path="/loans/normal/over100k" element={<Over100kLoan />} />
                <Route path="/changePassword" element={<ChangePass />} />
                <Route path="*" element={<PageNotFound />} /> 
              </Routes>
            </div>
          </Layout>
        </AuthProvider>
      </Router>
      
    </Wrapper>
    <Footer />
    </>
  );
};

export default App;