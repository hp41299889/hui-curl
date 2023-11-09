import {
  deleteCategory,
  getCategory,
  patchCategory,
  postCategory,
} from "@/app/_util/client/api/back";
import { useFetchData } from "@/app/_util/client/api/hook";
import { toLocale } from "@/app/_util/time";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Category } from "@prisma/client";

const CategoryTable = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Category>();
  const [category, mutate, isLoading] = useFetchData("category", getCategory);
  const { register, handleSubmit, reset } = useForm<Category>();

  const sortedCategory = category?.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const onSubmit = async (formValues: Category) => {
    const { createdAt, updatedAt, ...payload } = formValues;
    if (selected) {
      try {
        const res = await patchCategory(selected.id, payload);
        if (res.data.status === "success") {
          mutate();
          setOpen(false);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await postCategory(payload);
        if (res.data.status === "success") {
          mutate();
          setOpen(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onDelete = async (formValues: Category) => {
    try {
      const res = await deleteCategory(formValues.id);
      if (res.data.status === "success") {
        mutate();
        setDeleteOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    selected ? reset(selected) : reset({});
    reset(selected);
  }, [selected, reset]);

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              setSelected(undefined);
              setOpen(true);
            }}
          >
            +Create
          </Button>
          {sortedCategory && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>名稱</TableCell>
                    <TableCell>建立時間</TableCell>
                    <TableCell>更新時間</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedCategory.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{toLocale(c.createdAt)}</TableCell>
                      <TableCell>{toLocale(c.updatedAt)}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setSelected(c);
                            setOpen(true);
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSelected(c);
                            setDeleteOpen(true);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Category</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField label="名稱" {...register("name")} />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Category</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onDelete)}>
          <DialogContent>此動作無法恢復，確定要刪除嗎?</DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CategoryTable;
