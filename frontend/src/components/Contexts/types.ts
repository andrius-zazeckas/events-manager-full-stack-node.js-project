import { Dispatch, SetStateAction } from "react";
import type { TEvent } from "../../types/TEvent";

export type TEventsContext = {
  events: TEvent[];
  setEvents: Dispatch<SetStateAction<TEvent[]>>;
};
