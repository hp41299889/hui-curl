"use client";
import { useState } from "react";
import { Box, Button } from "@mui/material";

import { useFetchData } from "@/app/_util/client/api/hook";
import { getProduct } from "@/app/_util/client/api/back";
import ProductForm from "@/app/_component/form/product";
import ProductTable from "@/app/_component/table/product";
import { Product } from "@prisma/client";

// const fileds: Field[] = [
//   { type: "input", name: "description", label: "description" },
//   { type: "input", name: "price", label: "price" },
//   { type: "input", name: "link", label: "link" },
// ];

// const tableMetadata: TableMetadata[] = [
//   { key: "name", custom: addLinkToCell },
//   { key: "description" },
//   { key: "price" },
//   { key: "createdAt", custom: toLocale },
//   { key: "updatedAt", custom: toLocale },
// ];

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [product, mutate, isLoading, error] = useFetchData(
    "product",
    getProduct
  );

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => {
          setSelectedProduct(undefined);
          setOpen(true);
        }}
      >
        + Create
      </Button>
      <ProductForm open={open} setOpen={setOpen} initValue={selectedProduct} />
      {product !== undefined && (
        <ProductTable
          products={product}
          setSelected={setSelectedProduct}
          setOpen={setOpen}
        />
      )}
    </Box>
  );
};

export default Page;
