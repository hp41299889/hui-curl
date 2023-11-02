import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  TextField,
  styled,
  Grid,
} from "@mui/material";
import { Image as MuiImage } from "@mui/icons-material";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ProductDetailModal from "../modal/productDetail";
import { postProduct } from "@/app/_util/client/api/back";

interface Row {
  index: number;
  imgSrc: string;
}

export interface FormValues {
  name: string;
  description: string;
  price: number;
  image: File;
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProductForm = (props: Props) => {
  const { open, setOpen } = props;
  const [rows, setRows] = useState<Row[]>([{ index: 1, imgSrc: "" }]);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>();
  const { register, handleSubmit, getValues, control, reset } =
    useForm<FormValues[]>();

  const onClose = () => {
    setOpen(false);
    setRows([{ index: 1, imgSrc: "" }]);
    reset();
  };

  const onSubmit = async (formValues: any) => {
    console.log(formValues);
    const formData = new FormData();
    Object.keys(formValues).forEach((i) => {
      formData.append(`product[${i}][name]`, formValues[i].name);
      formData.append(`product[${i}][description]`, formValues[i].description);
      formData.append(`product[${i}][price]`, String(formValues[i].price));
      formData.append(`product[${i}][file]`, formValues[i].image);
    });

    const res = await postProduct(formData);
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      const newRows = rows.map((r, index) =>
        index === i ? { ...r, imgSrc: url } : r
      );
      setRows(newRows);
    }
  };

  return (
    <Box>
      <Dialog
        open={open}
        maxWidth="lg"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>Product Form</DialogTitle>
        <DialogContent>
          {Array.from({ length: rows.length }).map((_, i) => (
            <Stack
              key={`row_${i}`}
              direction="row"
              spacing={2}
              paddingBlock={0.5}
            >
              <TextField label="name" {...register(`${i}.name`)} />
              <TextField
                label="description"
                {...register(`${i}.description`)}
              />
              <TextField label="price" {...register(`${i}.price`)} />
              <Button component="label" variant="contained">
                Upload file
                <Controller
                  name={`${i}.image`}
                  control={control}
                  render={({ field: { onChange } }) => (
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => {
                        onChange(e.target.files![0]);
                        onChangeImage(e, i);
                      }}
                    />
                  )}
                />
              </Button>
              <Button
                onClick={() => {
                  setSelected(i);
                  setDetailOpen(true);
                }}
              >
                {rows[i].imgSrc && <MuiImage />}
                Detail
              </Button>
            </Stack>
          ))}
          <Button
            component="label"
            variant="contained"
            onClick={() =>
              setRows((pre) => [
                ...pre,
                { index: pre[pre.length - 1].index, imgSrc: "" },
              ])
            }
          >
            + Add
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
        <ProductDetailModal
          open={detailOpen}
          setOpen={setDetailOpen}
          selected={{
            ...getValues()[selected!],
            image: selected !== undefined ? rows[selected].imgSrc : "",
          }}
          setSelected={setSelected}
        />
      </Dialog>
    </Box>
  );
};

export default ProductForm;
