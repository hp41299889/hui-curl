import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Product } from "@prisma/client";

import { toLocale } from "@/app/_util/time";

interface Props {
  products: Product[];
  setSelected: (p: Product) => void;
  setOpen: (o: boolean) => void;
}

const ProductTable = (props: Props) => {
  const { products, setSelected, setOpen } = props;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>名稱</TableCell>
            <TableCell>描述</TableCell>
            <TableCell>價格</TableCell>
            <TableCell>建立時間</TableCell>
            <TableCell>更新時間</TableCell>
            <TableCell>圖片</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => (
            <TableRow key={`productRow_${p.id}`}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.description}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{toLocale(p.createdAt)}</TableCell>
              <TableCell>{toLocale(p.updatedAt)}</TableCell>
              <TableCell>
                <a>{p.link}</a>
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => {
                    setSelected(p);
                    setOpen(true);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton onClick={() => setSelected(p)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
