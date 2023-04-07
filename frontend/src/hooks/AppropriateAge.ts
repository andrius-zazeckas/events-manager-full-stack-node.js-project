import { useEffect, useState } from "react";

export const AppropriateAge = () => {
  const [date, setDate] = useState<string>("");

  const appropriateAge = () => {
    const today = new Date();
    const specifiedMinimumAge = 5;
    const calculatedAge = new Date().setFullYear(
      today.getFullYear() - specifiedMinimumAge
    );
    const calculatedAgeFormatted = new Date(calculatedAge)
      .toISOString()
      .split("T")[0];
    return setDate(calculatedAgeFormatted);
  };

  useEffect(() => {
    appropriateAge();
  }, []);

  return date;
};
