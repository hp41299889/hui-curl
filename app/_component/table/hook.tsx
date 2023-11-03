import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { AxiosResponse } from "axios";

import { useModalForm } from "../form/hook";
import { Response } from "@/app/_util/server/helper";

export interface Field {
  type?: "input";
  name: string;
  label: string;
  custom?: any;
}

interface ActTableProps<T> {
  title: string;
  onSubmit: {
    onCreate: (d: T) => Promise<AxiosResponse<Response<T>>>;
    onUpdate: (id: number, d: T) => Promise<AxiosResponse<Response<T>>>;
    onDelete: (id: number, d: T) => Promise<AxiosResponse<Response<T>>>;
  };
}

export const useActTable = <T extends { [key: string]: any }>(
  fields: Field[],
  data: T[] | undefined
) => {
  const ActTable = (props: ActTableProps<T>) => {
    const { title, onSubmit } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<T>();
    const [ModalForm] = useModalForm<T>(fields);
    const { onCreate, onUpdate, onDelete } = onSubmit;

    return (
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            setSelected(undefined);
            setOpen(true);
          }}
        >
          <Add />
          新增
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {fields.map((m) => (
                  <TableCell key={`tableHead_${m.label}`}>{m.label}</TableCell>
                ))}
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((d, i) => (
                  <TableRow key={`tableRow_${i}`}>
                    {fields.map((m) => (
                      <TableCell key={`tableCell_${i}_${m.name}`}>
                        {m.custom ? m.custom(d) : d[m.name]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setSelected(d);
                          setOpen(true);
                        }}
                      >
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
        <ModalForm
          title={`${selected ? "Update" : "Create"} ${title}`}
          selected={selected}
          open={open}
          setOpen={setOpen}
          onSubmit={selected ? onCreate : onUpdate}
        />
      </Box>
    );
  };

  return [ActTable];
};
