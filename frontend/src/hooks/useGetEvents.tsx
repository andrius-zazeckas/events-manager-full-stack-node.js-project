import axios from "axios";
import { useEffect, useState } from "react";
import { TEvent } from "../components/Events/types";

export const useGetEvents = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getEvents = async () => {
    axios
      .get("http://localhost:5000/events", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
        // alert(error.response.data.error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return { events, isLoading };
};
