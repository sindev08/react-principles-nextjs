"use client";

// =============================================================================
// UserTable.tsx — Data Tables recipe (TanStack Table v8)
// =============================================================================
// This component demonstrates the Data Tables pattern:
//
// 1. HEADLESS TABLE ENGINE — TanStack Table manages sorting, filtering,
//    and pagination state. We own the markup and styling.
//
// 2. STABLE COLUMN DEFINITIONS — Columns are wrapped in useMemo with an
//    empty dependency array. Column definitions are static — recreating
//    them on every render triggers unnecessary row model recalculations.
//
// 3. FLEXRENDER — Both headers and cells use flexRender() to delegate
//    rendering to column definitions. Never manually extract cell values.
//
// 4. CLIENT-SIDE PAGINATION — DummyJSON has ~208 users. For datasets
//    under ~1,000 rows, client-side pagination is appropriate. Beyond
//    that, move pagination to the server.
//
// Chain: service → hook (useUsers) → component (UserTable)
// =============================================================================

// ---------------------------------------------------------------------------
// 1. IMPORTS
// ---------------------------------------------------------------------------
import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import { cn } from "@/shared/utils/cn";
import type { User } from "@/shared/types/user";
import { useUsers } from "../hooks/useUsers";

// ---------------------------------------------------------------------------
// 2. TYPES
// ---------------------------------------------------------------------------
interface UserTableProps {
  /** How many users to fetch. Defaults to 100 (client-side pagination). */
  limit?: number;
}

// ---------------------------------------------------------------------------
// 3. COMPONENT FUNCTION
// ---------------------------------------------------------------------------
export function UserTable({ limit = 100 }: UserTableProps) {
  // --- Server state via React Query ---
  const { data, isLoading, isError } = useUsers({ limit, skip: 0 });

  // --- Table state ---
  // SortingState tracks which column is sorted and in which direction.
  // TanStack Table manages the sort logic — we just store the state.
  const [sorting, setSorting] = useState<SortingState>([]);

  // globalFilter applies a single search across ALL string columns.
  // getFilteredRowModel handles the matching — no manual filtering needed.
  const [globalFilter, setGlobalFilter] = useState("");

  // --- Stable column definitions ---
  // WHY useMemo with []? Column definitions are static configuration.
  // Without useMemo, a new array reference is created every render,
  // causing TanStack Table to recalculate sort/filter/pagination models.
  //
  // WHY accessorFn for name? DummyJSON returns firstName and lastName
  // as separate fields. accessorFn lets us combine them into a single
  // sortable, filterable column.
  const columns = useMemo<Array<ColumnDef<User>>>(
    () => [
      {
        id: "name",
        header: "Name",
        // accessorFn combines two fields into one column value.
        // This value is what sorting and globalFilter operate on.
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        cell: (info) => (
          <span className="font-medium">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "age",
        header: "Age",
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: (info) => (
          <span className="capitalize">{info.getValue<string>()}</span>
        ),
      },
    ],
    [],
  );

  // --- Table instance ---
  // useReactTable is the core hook. It takes data + columns + row model
  // plugins and returns the table API for rendering.
  const table = useReactTable({
    data: data?.users ?? [],
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    // Row model plugins — each adds a processing step:
    getCoreRowModel: getCoreRowModel(), // Required: base row model
    getSortedRowModel: getSortedRowModel(), // Sorts rows by sorting state
    getFilteredRowModel: getFilteredRowModel(), // Filters rows by globalFilter
    getPaginationRowModel: getPaginationRowModel(), // Slices rows into pages
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  // --- Loading state ---
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-12 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800"
          />
        ))}
      </div>
    );
  }

  // --- Error state ---
  if (isError) {
    return (
      <p className="text-sm text-red-500">
        Failed to load users. Check your network and try again.
      </p>
    );
  }

  // --- Success state ---
  return (
    <div className="space-y-4">
      {/* Global filter — searches across ALL string columns */}
      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search all columns..."
        className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
      />

      {/* Table — we own the markup, TanStack Table owns the logic */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400"
                  >
                    <div className="flex items-center gap-1">
                      {/* flexRender delegates rendering to the column definition */}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {/* Sort direction indicator */}
                      {{
                        asc: " \u2191",
                        desc: " \u2193",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()} ({table.getFilteredRowModel().rows.length}{" "}
          rows)
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={cn(
              "rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium transition-colors",
              "hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50",
              "dark:border-zinc-700 dark:hover:bg-zinc-800",
            )}
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={cn(
              "rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium transition-colors",
              "hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50",
              "dark:border-zinc-700 dark:hover:bg-zinc-800",
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
