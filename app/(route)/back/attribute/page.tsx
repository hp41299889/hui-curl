"use client";
import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

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
import CategoryTable from "@/app/_component/table/category";

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

const Page = () => {
  const [tab, setTab] = useState<number>(0);

  return (
    <Box>
      <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)}>
        {tabs.map((t) => (
          <Tab key={`tab_${t.index}`} label={t.label} {...a11yProps(t.index)} />
        ))}
      </Tabs>
      <Box className="p-2">{tab === 0 && <CategoryTable />}</Box>
    </Box>
  );
};

export default Page;
