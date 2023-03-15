import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Paste from "./Pages/Paste";
import checkHandler from "./Routes/checkRoute";
import { LoadingContext } from "./Contexts/LoadingContext";
import Loading from "./Pages/Loading";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const isLoading = React.useContext(LoadingContext);
  const [health, setHealth] = React.useState(false);
  console.log("App Rendered");

  React.useEffect(() => {
    const checkHealth = async () => {
      isLoading.setIsLoading(true);
      const health = await checkHandler();
      console.log(health);
      setHealth(health);
      isLoading.setIsLoading(false);
    };
    checkHealth();
  }, []);

  const HealthComponent = () => {
    if (health) {
      return (
        <div>
          <Navbar />
          <BrowserRouter>
            <ChakraProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:url" element={<Paste />} />
              </Routes>
            </ChakraProvider>
          </BrowserRouter>
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="content-center">
          <h1>Server is down sorry</h1>
        </div>
      );
    }
  };

  return (
    <Loading>
      <HealthComponent />
    </Loading>
  );
};

export default App;
