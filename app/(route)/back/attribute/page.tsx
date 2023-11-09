"use client";
import CategoryTable from "@/app/_component/table/category";
import ColorTable from "@/app/_component/table/color";
import SizeTable from "@/app/_component/table/size";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

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
      <Box className="p-2">
        {tab === 0 && <CategoryTable />}
        {tab === 1 && <ColorTable />}
        {tab === 2 && <SizeTable />}
      </Box>
    </Box>
  );
};

export default Page;
