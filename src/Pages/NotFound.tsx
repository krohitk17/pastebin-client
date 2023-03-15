import React from "react";

import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

export default function NotFound() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <h1>404 Not Found</h1>
      </div>
      <Footer />
    </div>
  );
}
