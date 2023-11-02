import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import Image from "next/image";

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selected: Product;
  setSelected: (index: number | undefined) => void;
}

const ProductDetailModal = (props: Props) => {
  const { open, setOpen, selected, setSelected } = props;

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setSelected(undefined);
      }}
    >
      <DialogTitle>{selected.name}</DialogTitle>
      <DialogContent>
        {selected.description && (
          <Typography>Description: {selected.description}</Typography>
        )}
        {selected.price && <Typography>Price: {selected.price}</Typography>}
        {selected.image && (
          <Image alt="" src={selected.image} width={400} height={600} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
