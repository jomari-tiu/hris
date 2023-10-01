import { format, isValid, parse } from "date-fns";

export const textDateFormat = (date: string) => {
  const formattedDate = parse(date, "yyyy-MM-dd", new Date());
  return isValid(formattedDate) ? format(formattedDate, "MMM dd, yyyy") : "";
};

export const numberDateFormat = (date: string) => {
  const formattedDate = parse(date, "MMM dd, yyyy", new Date());
  return isValid(formattedDate) ? format(formattedDate, "yyyy-MM-dd") : "";
};
