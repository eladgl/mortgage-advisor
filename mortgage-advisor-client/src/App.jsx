import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/homepage"; 
import { pageTypeSelector } from "./pages/pageTypeSelector";
// import Homepage from "./pages/homepage";
// import Register from "./pages/register";
import NavBar from "./components/navBar";
import styled from 'styled-components';
import * as types from './pages/constants/pagesTypes';
import UserCard from './components/userCard';
import { linksConfig } from  "./pages/config/linksConfig";

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;
// //Override jsx prgama function to tell which name every HTML tag gets
// const withComponentName = (Component, props) => {
//   const componentName = Component.displayName || Component.name;
//   return <Component {...props} className={componentName} />;
// };

// // Set the custom pragma globally
// React.createElement = withComponentName;

const App = () => {
  const [Page, setPage] = useState(window.location.pathname || '/home');
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const makeRoute = () => (
    linksConfig.map((link) => 
      <Route path={link.path} element={pageTypeSelector({type : link.component}, {k:1})}/>
    )
  );

  return (
    <div>
      <UserCard />
      <Layout>
        <NavBar changeComponent={ handlePageChange } currentPage={ Page }/>
        <PageWrapper>
        <Router>
      <Routes>
        {makeRoute()}
      </Routes>
      </Router>
        </PageWrapper>
        </Layout>
    </div>
  );
};

export default App;
