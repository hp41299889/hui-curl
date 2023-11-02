import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export interface Field {
  type: "input";
  name: string;
  label: string;
}

interface ModalFormProps {
  title: string;
  open: boolean;
  setOpen: (show: boolean) => void;
}

export const useModalForm = (fields: Field[]) => {
  const ModalForm = (props: ModalFormProps) => {
    const { title, open, setOpen } = props;

    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {fields.map((f) => (
            <Box key={`modalForm_field_${f.name}`}>
              {f.type === "input" && <TextField id={f.name} label={f.label} />}
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return [ModalForm];
};
