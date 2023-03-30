export const formatDate = (date: Date) => {
  const d = new Date(date);
  // format date time as YYYY-MM-DD HH:MM:SS
  return Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(d);
};
