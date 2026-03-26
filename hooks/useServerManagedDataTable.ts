"use client";

import { useSearchParams } from "next/navigation";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import DataTable from "@/components/shared/table/DataTable";
import { getExperts } from "@/services/expert.service";
import { useEffect, useState } from "react";

const ExpertsPage = () => {
  const searchParams = useSearchParams();

  // -----------------------------
  // 1. Server-managed table hook
  // -----------------------------
  const {
    optimisticSortingState,
    optimisticPaginationState,
    handleSortingChange,
    handlePaginationChange,
    updateParams,
  } = useServerManagedDataTable({
    searchParams,
  });

  // -----------------------------
  // 2. Fetch data from API
  // -----------------------------
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchExperts = async () => {
    setIsLoading(true);
    try {
      const query = searchParams.toString();
      const res = await getExperts(query);
      setData(res?.data || []);
      setMeta(res?.meta || {});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [searchParams]);

  // -----------------------------
  // 3. Table columns
  // -----------------------------
  const columns = [
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row }) => row.original.fullName,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => row.original.title,
    },
    {
      accessorKey: "industry",
      header: "Industry",
      cell: ({ row }) => row.original.industry?.name,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.original.price}`,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Experts</h1>

      <DataTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No experts found."

        // -----------------------------
        // Search
        // -----------------------------
        search={{
          initialValue: searchParams.get("search") ?? "",
          placeholder: "Search experts...",
          debounceMs: 400,
          onDebouncedChange: (value) =>
            updateParams((params) => {
              if (value) params.set("search", value);
              else params.delete("search");
            }, { resetPage: true }),
        }}

        // -----------------------------
        // Sorting
        // -----------------------------
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}

        // -----------------------------
        // Pagination
        // -----------------------------
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}

        meta={meta}
      />
    </div>
  );
};

export default ExpertsPage;