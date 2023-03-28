import { createContext, useState } from "react";
import { TEvent, TEventVisitors } from "../Events/types";
import { TUsers } from "../Users";
import { TVisitors } from "../Visitors/types";
import type { TEventsContext } from "./types";

export const EventsContext = createContext<TEventsContext>({
  events: [],
  setEvents: () => {},
  eventVisitors: [],
  setEventVisitors: () => {},
  visitors: [],
  setVisitors: () => {},
  users: [],
  setUsers: () => {},
});

export const EventsContextProvider = ({ children }: any) => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [eventVisitors, setEventVisitors] = useState<TEventVisitors[]>([]);
  const [visitors, setVisitors] = useState<TVisitors[]>([]);
  const [users, setUsers] = useState<TUsers[]>([]);

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        eventVisitors,
        setEventVisitors,
        visitors,
        setVisitors,
        users,
        setUsers,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
