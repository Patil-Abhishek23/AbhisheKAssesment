'use client';

import React, { useState } from "react";
import Head from "next/head";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  TableToolbarSearch,
  Button,
  TableSelectAll,
  TableSelectRow,
  Modal,
  Theme,
} from "@carbon/react";
import { Save } from "@carbon/icons-react";
import Navbar from '../navbar';


const headers = [
  { header: "Name", key: "name" },
  { header: "ID", key: "id" },
  { header: "Attached groups", key: "attached_groups" },
];

const rows = [
  { name: "Load Balancer 1", id: "a", attached_groups: "Kevin's VM Groups" },
  { name: "Load Balancer 2", id: "b", attached_groups: "John's VM Groups" },
  { name: "Load Balancer 3", id: "c", attached_groups: "Alice's VM Groups" },
  { name: "Load Balancer 4", id: "d", attached_groups: "Bob's VM Groups" },
  { name: "Load Balancer 5", id: "e", attached_groups: "Eve's VM Groups" },
  { name: "Load Balancer 6", id: "f", attached_groups: "David's VM Groups" },
  { name: "Load Balancer 7", id: "g", attached_groups: "Sam's VM Groups" },
  { name: "Load Balancer 8", id: "h", attached_groups: "LG's VM Groups" },
  { name: "Load Balancer 9", id: "i", attached_groups: "Honda's VM Groups" },
  { name: "Load Balancer 10", id: "j", attached_groups: "Samsung's VM Groups" },
];

export default function DataTablePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<
    { id: string; cells: { id: string; value: string }[] }[]
  >([]);
  const [theme, setTheme] = useState<"g100" | "white">("g100");

  return (
    <Theme theme={theme}>
      <Head>
        <title>Data Table</title>
        <meta name="description" content="Data table using Carbon Design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar theme={theme} setTheme={setTheme} language={"English"} setLanguage={function (lang: "English" | "Spanish"): void {
        throw new Error("Function not implemented.");
      } } />

      <div style={{ padding: "2rem" }}>
        <DataTable rows={rows} headers={headers} isSortable>
          {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getSelectionProps,
            getBatchActionProps,
            onInputChange,
            selectedRows,
          }) => {
            const batchActionProps = getBatchActionProps();
            return (
              <TableContainer title="Data Table">
                <TableToolbar>
                  <TableBatchActions {...batchActionProps}>
                    <TableBatchAction
                      renderIcon={Save}
                      onClick={() => {
                        setSelectedRows(selectedRows);
                        setIsModalOpen(true);
                      }}
                    >
                      Save
                    </TableBatchAction>
                  </TableBatchActions>
                  <TableToolbarContent>
                    <TableToolbarSearch
                      onChange={(event) =>
                        onInputChange(event as React.ChangeEvent<HTMLInputElement>)
                      }
                    />
                    <Button kind="primary">Add new</Button>
                  </TableToolbarContent>
                </TableToolbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow {...getRowProps({ row })}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          }}
        </DataTable>

        <Modal
          open={isModalOpen}
          modalHeading="Selected Rows"
          primaryButtonText="Close"
          onRequestClose={() => setIsModalOpen(false)}
        >
          {selectedRows.length > 0 ? (
            <ul>
              {selectedRows.map((row) => (
                <li key={row.id}>
                  {row.cells.map((cell) => `${cell.value} `).join(" | ")}
                </li>
              ))}
            </ul>
          ) : (
            <p>No rows selected</p>
          )}
        </Modal>
      </div>
    </Theme>
  );
}
