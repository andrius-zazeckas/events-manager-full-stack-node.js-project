import { Fade } from "@mui/material";
import { EventsContextProvider } from "./components/Contexts/EventsContext";
import { MainRouter } from "./components/MainRouter/MainRouter";

function App() {
  return (
    <Fade in>
      <div>
        <EventsContextProvider>
          <MainRouter />
        </EventsContextProvider>
      </div>
    </Fade>
  );
}

export default App;
