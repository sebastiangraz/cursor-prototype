import "./App.css";
import { ThemeProvider } from "theme-ui";
import theme from "./theme";
import { Cursor, Modal } from "./components";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Cursor>
        <Modal></Modal>
      </Cursor>
    </ThemeProvider>
  );
}

export default App;
