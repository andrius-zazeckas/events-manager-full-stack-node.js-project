import type { TEventVisitors } from "../Events/types";

export type TVisitors = TEventVisitors & {
  event_name: string | null;
  event_id: number | null;
};

export type TVisitorProps = { visitor: TVisitors };
