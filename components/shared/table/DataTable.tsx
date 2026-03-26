"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";

import DataTableSearch from "./DataTableSearch";
import DataTablePagination from "./DataTablePagination";

interface DataTableActions<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: DataTableActions<TData>;
  toolbarAction?: React.ReactNode;
  emptyMessage?: string;
  isLoading?: boolean;

  sorting?: {
    state: SortingState;
    onSortingChange: (state: SortingState) => void;
  };

  pagination?: {
    state: PaginationState;
    onPaginationChange: (state: PaginationState) => void;
  };

  search?: {
    initialValue?: string;
    placeholder?: string;
    debounceMs?: number;
    onDebouncedChange: (value: string) => void;
  };

  meta?: {
    totalPages?: number;
    total?: number;
  };
}

const DataTable = <TData,>({
  data = [] as TData[],
  columns,
  actions,
  toolbarAction,
  emptyMessage,
  isLoading,
  sorting,
  pagination,
  search,
  meta,
}: DataTableProps<TData>) => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const hydratedIsLoading = hasHydrated ? Boolean(isLoading) : false;

  // -----------------------------
  // Add Actions Column
  // -----------------------------
  const tableColumns: ColumnDef<TData>[] = actions
    ? [
        ...columns,
        {
          id: "actions",
          header: "Actions",
          enableSorting: false,
          cell: ({ row }) => {
            const rowData = row.original;

            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {actions.onView && (
                    <DropdownMenuItem onClick={() => actions.onView?.(rowData)}>
                      View
                    </DropdownMenuItem>
                  )}

                  {actions.onEdit && (
                    <DropdownMenuItem onClick={() => actions.onEdit?.(rowData)}>
                      Edit
                    </DropdownMenuItem>
                  )}

                  {actions.onDelete && (
                    <DropdownMenuItem
                      onClick={() => actions.onDelete?.(rowData)}
                    >
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ]
    : columns;

  // -----------------------------
  // TanStack Table Setup
  // -----------------------------
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    manualSorting: !!sorting,
    manualPagination: !!pagination,
    pageCount: pagination ? Math.max(meta?.totalPages ?? 0, 0) : undefined,

    state: {
      ...(sorting ? { sorting: sorting.state } : {}),
      ...(pagination ? { pagination: pagination.state } : {}),
    },

    onSortingChange: sorting
      ? (updater) => {
          const next =
            typeof updater === "function"
              ? updater(sorting.state)
              : updater;
          sorting.onSortingChange(next);
        }
      : undefined,

    onPaginationChange: pagination
      ? (updater) => {
          const next =
            typeof updater === "function"
              ? updater(pagination.state)
              : updater;
          pagination.onPaginationChange(next);
        }
      : undefined,
  });

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {hydratedIsLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </div>
      )}

      {/* Toolbar */}
      {(search || toolbarAction) && (
        <div className="mb-4 flex flex-wrap items-start gap-3">
          {search && (
            <DataTableSearch
              key={search.initialValue ?? ""}
              initialValue={search.initialValue}
              placeholder={search.placeholder}
              debounceMs={search.debounceMs}
              onDebouncedChange={search.onDebouncedChange}
              isLoading={hydratedIsLoading}
            />
          )}

          {toolbarAction && (
            <div className="ml-auto shrink-0">{toolbarAction}</div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUp className="ml-1 h-4 w-4" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDown className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                        )}
                      </Button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage || "No data available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {pagination && (
          <DataTablePagination
            table={table}
            totalPages={meta?.totalPages}
            totalRows={meta?.total}
            isLoading={hydratedIsLoading}
          />
        )}
      </div>
    </div>
  );
};

export default DataTable;