import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CustomProvider } from "rsuite";
import App from "./App.tsx";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomProvider theme="dark">
      <App />
    </CustomProvider>
  </StrictMode>,
);
