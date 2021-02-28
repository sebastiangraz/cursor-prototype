import "./App.css";
import { ThemeProvider } from "theme-ui";
import theme from "./theme";
import { Base, Modal } from "./components";
import React from "react";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Base>
        <Modal></Modal>
      </Base>
    </ThemeProvider>
  );
}

export default App;
