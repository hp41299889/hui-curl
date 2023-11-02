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
import React from "react";

export interface TableMetadata {
  key: string;
  custom?: any;
}

export const useActTable = <T extends { [key: string]: any }>(
  metadata: TableMetadata[],
  data: T[] | undefined
) => {
  const ActTable = () => {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {metadata.map((m) => (
                <TableCell key={`tableHead_${m.key}`}>{m.key}</TableCell>
              ))}
              <TableCell>action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((d, i) => (
                <TableRow key={`tableRow_${i}`}>
                  {metadata.map((m) => (
                    <TableCell key={`tableCell_${i}_${m.key}`}>
                      {m.custom ? m.custom(d) : d[m.key]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton>
                      <Edit />
                    </IconButton>
                    <IconButton>
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

  return [ActTable];
};
