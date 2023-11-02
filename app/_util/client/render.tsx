import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";

export const toLocale = (node: any) => {
  const { createdAt, updatedAt } = node;
  return dayjs(createdAt || updatedAt).format("YYYY-MM-DD HH:mm:ss");
};

export const addLinkToCell = (node: any) => {
  const { link, name } = node;
  return <Link href={link}>{name}</Link>;
};
