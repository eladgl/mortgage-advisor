import React from "react";
import * as access from "@access";
const HomePage = () => {
  return (
    <div>
      <h1 style={{'color': access.color('colors.blue05')}}>Welcome to Our Website</h1>
      <p>This is the homepage. You can customize this content.</p>
    </div>
  );
};

export default HomePage;
