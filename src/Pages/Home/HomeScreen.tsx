import TextArea from "./TextArea";
import PasteForm from "./PasteForm";
import { BodyContextProvider } from "../../Contexts/BodyContext";
import { SyntaxContextProvider } from "../../Contexts/SyntaxContext";
import { useState, useEffect } from "react";
import checkHandler from "../../Routes/checkRoute";
import Loading from "../../Components/Loading";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [health, setHealth] = useState(false);
  console.log("App Rendered");

  useEffect(() => {
    const checkHealth = async () => {
      setIsLoading(true);
      const health = await checkHandler();
      console.log(health);
      setHealth(health);
      setIsLoading(false);
    };
    checkHealth();
  }, []);

  const HealthComponent = () => {
    if (!health) {
      return <h1>Server is down, please try again later.</h1>;
    }
    return (
      <BodyContextProvider>
        <SyntaxContextProvider>
          <TextArea />
          <PasteForm />
        </SyntaxContextProvider>
      </BodyContextProvider>
    );
  };

  return (
    <Loading isLoading={isLoading}>
      <HealthComponent />
    </Loading>
  );
}
