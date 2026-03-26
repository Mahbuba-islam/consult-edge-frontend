"use client";

import { ReadonlyURLSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { UpdateParamsFn } from "./useServerManagedDataTable";

interface UseServerManagedDataTableSearchParams {
  searchParams: ReadonlyURLSearchParams;
  updateParams: UpdateParamsFn;
  queryKey?: string;
}

export const useServerManagedDataTableSearch = ({
  searchParams,
  updateParams,
  queryKey = "searchTerm",
}: UseServerManagedDataTableSearchParams) => {
  const searchTermFromUrl = useMemo(() => {
    return searchParams.get(queryKey) ?? "";
  }, [queryKey, searchParams]);

  const handleDebouncedSearchChange = useCallback((searchTerm: string) => {
    const normalizedSearchTerm = searchTerm.trim();
    const currentSearchTerm = searchParams.get(queryKey) ?? "";

    if (normalizedSearchTerm === currentSearchTerm) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateParams((params:any) => {
      if (normalizedSearchTerm) {
        params.set(queryKey, normalizedSearchTerm);
        return;
      }

      params.delete(queryKey);
    }, { resetPage: true });
  }, [queryKey, searchParams, updateParams]);

  return {
    searchTermFromUrl,
    handleDebouncedSearchChange,
  };
};