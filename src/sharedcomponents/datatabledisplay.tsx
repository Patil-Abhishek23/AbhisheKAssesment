"use client";
import React from "react";
import { DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@carbon/react";

interface DataTableDisplayProps {}

const DataTableDisplay: React.FC<DataTableDisplayProps> = (args) => {
  const rows = [
    {
      id: "load-balancer-1",
      name: "Load Balancer 1",
      rule: "Round robin",
      status: "Starting",
      other: "Test",
      example: "22",
    },
    {
      id: "load-balancer-2",
      name: "Load Balancer 2",
      rule: "DNS delegation",
      status: "Active",
      other: "Test",
      example: "22",
    },
    {
      id: "load-balancer-3",
      name: "Load Balancer 3",
      rule: "Round robin",
      status: "Disabled",
      other: "Test",
      example: "22",
    },
    {
      id: "load-balancer-4",
      name: "Load Balancer 4",
      rule: "Round robin",
      status: "Disabled",
      other: "Test",
      example: "22",
    },
    {
      id: "load-balancer-5",
      name: "Load Balancer 5",
      rule: "Round robin",
      status: "Disabled",
      other: "Test",
      example: "22",
    },
    {
      id: "load-balancer-6",
      name: "Load Balancer 6",
      rule: "Round robin",
      status: "Disabled",
      other: "Test",
      example: "22",
    },
    {
      id: "load-balancer-7",
      name: "Load Balancer 7",
      rule: "Round robin",
      status: "Disabled",
      other: "Test",
      example: "22",
    },
    {
      id: "load-balancer-1",
      name: "Load Balancer 1",
      rule: "Round robin",
      status: "Starting",
      other: "Test",
      example: "22",
    },
    {
      id: "load-balancer-1",
      name: "Load Balancer 1",
      rule: "Round robin",
      status: "Starting",
      other: "Test",
      example: "22",
    },
  ];

  const headers = [
    { key: "name", header: "Name" },
    { key: "rule", header: "Rule" },
    { key: "status", header: "Status" },
    { key: "other", header: "Other" },
    { key: "example", header: "Example" },
  ];

  return (
    <DataTable rows={rows} headers={headers} {...args}>
      {({ rows, headers, getHeaderProps }) => (
        <Table aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })} key={header.key}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
};

export default DataTableDisplay;
