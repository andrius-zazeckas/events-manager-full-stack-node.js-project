export type TEvent = {
  id: number;
  event_name: string | null;
  description: string | null;
  date: string | number | Date;
  image: string;
};

export type TEventVisitors = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  age: number | null;
  date_of_birth: string | number | Date;
};

export type TEventProps = { event: TEvent };
export type TEventVisitorProps = { eventVisitor: TEventVisitors };
