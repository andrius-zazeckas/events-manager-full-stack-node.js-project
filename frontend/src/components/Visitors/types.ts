import type { TEventVisitors } from "../Events/types";

export type TVisitors = TEventVisitors & {
  event_name: string | null;
};

export type TVisitorProps = { visitor: TVisitors };
