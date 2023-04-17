import { Fade } from "@mui/material";
import { EventsContextProvider } from "./components/Contexts/EventsContext";
import { MainRouter } from "./components/MainRouter/MainRouter";

function App() {
  return (
    <Fade in>
      <div
        style={{
          minHeight: "90vh",
          overflow: "hidden",
          display: "block",
          position: "relative",
          paddingBottom: "100px",
        }}
      >
        <EventsContextProvider>
          <MainRouter />
        </EventsContextProvider>
      </div>
    </Fade>
  );
}

export default App;
