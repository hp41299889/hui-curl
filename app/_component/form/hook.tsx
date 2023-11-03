import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Path, useForm } from "react-hook-form";

import { Field } from "../table/hook";

interface ModalFormProps<T> {
  selected?: T;
  title: string;
  open: boolean;
  setOpen: (show: boolean) => void;
  onSubmit: any;
}

export const useModalForm = <T extends { [key: string]: any }>(
  fields: Field[]
) => {
  const ModalForm = (props: ModalFormProps<T>) => {
    const { selected, title, open, setOpen, onSubmit } = props;
    const { register, handleSubmit } = useForm<T>();

    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {fields.map((f) => (
              <Box key={`modalForm_field_${f.name}`}>
                {f.type === "input" && (
                  <TextField
                    defaultValue={selected ? selected[f.name] : undefined}
                    id={f.name}
                    label={f.label}
                    {...register(f.name as Path<T>)}
                  />
                )}
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  };

  return [ModalForm];
};
