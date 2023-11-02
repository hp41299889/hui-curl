"use client";
import { useState } from "react";
import { Box, Button } from "@mui/material";

import { Field, useModalForm } from "@/app/_component/form/hook";
import { useFetchData } from "@/app/_util/client/api/hook";
import { getProduct } from "@/app/_util/client/api/back";
import { TableMetadata, useActTable } from "@/app/_component/table/hook";
import { addLinkToCell, toLocale } from "@/app/_util/client/render";
import ProductForm from "@/app/_component/form/product";

const fileds: Field[] = [
  { type: "input", name: "description", label: "description" },
  { type: "input", name: "price", label: "price" },
  { type: "input", name: "link", label: "link" },
];

const tableMetadata: TableMetadata[] = [
  { key: "name", custom: addLinkToCell },
  { key: "description" },
  { key: "price" },
  { key: "createdAt", custom: toLocale },
  { key: "updatedAt", custom: toLocale },
];

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [product, mutate, isLoading, error] = useFetchData(
    "product",
    getProduct
  );
  const [ActTable] = useActTable(tableMetadata, product);
  // const [ModalForm] = useModalForm(fileds);

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        + Create
      </Button>
      <ProductForm open={open} setOpen={setOpen} />
      <ActTable />
    </Box>
  );
};

export default Page;
