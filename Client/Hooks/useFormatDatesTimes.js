export const getDayName = (day) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day];
};

export const formatTime = (time) => {
  const [hours, minutes] = time.match(/.{1,2}/g);
  return `${hours}:${minutes}`;
};