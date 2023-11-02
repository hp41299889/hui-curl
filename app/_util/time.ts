import dayjs, { Dayjs } from "dayjs";

export const toLocale = (time: string | Dayjs | Date) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};
