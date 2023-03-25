import { createContext, useState } from "react";
import { TEvent } from "../../types";
import type { TEventsContext } from "./types";

export const EventsContext = createContext<TEventsContext>({
  events: [],
  setEvents: () => {},
});

export const EventsContextProvider = ({ children }: any) => {
  const [events, setEvents] = useState<TEvent[]>([]);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
};
