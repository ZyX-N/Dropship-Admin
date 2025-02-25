export const getDateTime = (dt) => {
  let date = new Date(dt);
  return Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
