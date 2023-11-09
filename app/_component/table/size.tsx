import {
  deleteCategory,
  deleteSize,
  getCategory,
  getSize,
  patchCategory,
  patchSize,
  postCategory,
  postSize,
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
import { Category, Size } from "@prisma/client";

const SizeTable = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Size>();
  const [size, mutate, isLoading] = useFetchData("size", getSize);
  const { register, handleSubmit, reset } = useForm<Size>();

  const sortedSize = size?.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const onSubmit = async (formValues: Size) => {
    const { createdAt, updatedAt, ...payload } = formValues;
    if (selected) {
      try {
        const res = await patchSize(selected.id, payload);
        if (res.data.status === "success") {
          mutate();
          setOpen(false);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await postSize(payload);
        if (res.data.status === "success") {
          mutate();
          setOpen(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onDelete = async (formValues: Size) => {
    try {
      const res = await deleteSize(formValues.id);
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
          {sortedSize && (
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
                  {sortedSize.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{toLocale(s.createdAt)}</TableCell>
                      <TableCell>{toLocale(s.updatedAt)}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setSelected(s);
                            setOpen(true);
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSelected(s);
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
        <DialogTitle>Size</DialogTitle>
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
        <DialogTitle>Size</DialogTitle>
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

export default SizeTable;
