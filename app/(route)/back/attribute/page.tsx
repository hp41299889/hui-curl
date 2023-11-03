"use client";
import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import { Field, useActTable } from "@/app/_component/table/hook";
import {
  deleteCategory,
  deleteColor,
  deleteSize,
  getCategory,
  getColor,
  getSize,
  patchCategory,
  patchColor,
  patchSize,
  postCategory,
  postColor,
  postSize,
} from "@/app/_util/client/api/back";
import { useFetchData } from "@/app/_util/client/api/hook";
import { toLocale } from "@/app/_util/client/render";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const tabs = [
  { index: 0, label: "Category" },
  { index: 1, label: "Color" },
  { index: 2, label: "Size" },
];

const categoryField: Field[] = [
  { type: "input", name: "name", label: "名稱" },
  { name: "createdAt", label: "建立時間", custom: toLocale },
  { name: "updatedAt", label: "更新時間", custom: toLocale },
];

const colorField: Field[] = [
  { type: "input", name: "name", label: "名稱" },
  { name: "createdAt", label: "建立時間", custom: toLocale },
  { name: "updatedAt", label: "更新時間", custom: toLocale },
];

const sizeField: Field[] = [
  { type: "input", name: "name", label: "名稱" },
  { name: "createdAt", label: "建立時間", custom: toLocale },
  { name: "updatedAt", label: "更新時間", custom: toLocale },
];

const Page = () => {
  const [tab, setTab] = useState<number>(0);
  const [category] = useFetchData("category", getCategory);
  const [color] = useFetchData("color", getColor);
  const [size] = useFetchData("size", getSize);

  const [CategoryActTable] = useActTable(categoryField, category);
  const [ColorActTable] = useActTable(colorField, color);
  const [SizeActTable] = useActTable(sizeField, size);

  return (
    <Box>
      <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)}>
        {tabs.map((t) => (
          <Tab key={`tab_${t.index}`} label={t.label} {...a11yProps(t.index)} />
        ))}
      </Tabs>
      <Box className="p-2">
        {tab === 0 && (
          <CategoryActTable
            title="Category"
            onSubmit={{
              onCreate: postCategory,
              onUpdate: patchCategory,
              onDelete: deleteCategory,
            }}
          />
        )}
        {tab === 1 && (
          <ColorActTable
            title="Color"
            onSubmit={{
              onCreate: postColor,
              onUpdate: patchColor,
              onDelete: deleteColor,
            }}
          />
        )}
        {tab === 2 && (
          <SizeActTable
            title="Size"
            onSubmit={{
              onCreate: postSize,
              onUpdate: patchSize,
              onDelete: deleteSize,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Page;
