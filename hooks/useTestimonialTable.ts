"use client";

import { PaginationState, SortingState } from "@tanstack/react-table";
import { ReadonlyURLSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

interface UseTestimonialTableParams {
  searchParams: ReadonlyURLSearchParams;
  defaultPage?: number;
  defaultLimit?: number;
}

export interface UpdateParamsOptions {
  resetPage?: boolean;
}

export type UpdateParamsFn = (
  updater: (params: URLSearchParams) => void,
  options?: UpdateParamsOptions
) => void;

const parsePositiveInteger = (value: string | null, fallbackValue: number): number => {
  if (!value) return fallbackValue;

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return fallbackValue;

  return parsed;
};

export const useTestimonialTable = ({
  searchParams,
  defaultPage = 1,
  defaultLimit = 10,
}: UseTestimonialTableParams) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isRouteRefreshPending, startRouteRefreshTransition] = useTransition();

  // -----------------------------
  // Extract query string
  // -----------------------------
  const queryStringFromUrl = useMemo(() => searchParams.toString(), [searchParams]);

  // -----------------------------
  // Pagination from URL
  // -----------------------------
  const paginationStateFromUrl = useMemo<PaginationState>(() => {
    const page = parsePositiveInteger(searchParams.get("page"), defaultPage);
    const limit = parsePositiveInteger(searchParams.get("limit"), defaultLimit);

    return {
      pageIndex: page - 1,
      pageSize: limit,
    };
  }, [defaultLimit, defaultPage, searchParams]);

  // -----------------------------
  // Sorting from URL
  // -----------------------------
  const sortingStateFromUrl = useMemo<SortingState>(() => {
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");

    if (!sortBy || (sortOrder !== "asc" && sortOrder !== "desc")) {
      return [];
    }

    return [{ id: sortBy, desc: sortOrder === "desc" }];
  }, [searchParams]);

  // -----------------------------
  // Optimistic UI states
  // -----------------------------
  const [optimisticSortingState, setOptimisticSortingState] =
    useState<SortingState>(sortingStateFromUrl);

  const [optimisticPaginationState, setOptimisticPaginationState] =
    useState<PaginationState>(paginationStateFromUrl);

  useEffect(() => {
    setOptimisticSortingState(sortingStateFromUrl);
  }, [sortingStateFromUrl]);

  useEffect(() => {
    setOptimisticPaginationState(paginationStateFromUrl);
  }, [paginationStateFromUrl]);

  // -----------------------------
  // Update URL + refresh server components
  // -----------------------------
  const updateUrlAndRefresh = useCallback(
    (params: URLSearchParams) => {
      const nextQuery = params.toString();
      const currentQuery = window.location.search.replace(/^\?/, "");

      if (nextQuery === currentQuery) return;

      const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

      window.history.pushState(null, "", nextUrl);

      startRouteRefreshTransition(() => {
        router.refresh();
      });
    },
    [pathname, router, startRouteRefreshTransition]
  );

  // -----------------------------
  // Update params helper
  // -----------------------------
  const updateParams = useCallback<UpdateParamsFn>(
    (updater, options) => {
      const params = new URLSearchParams(window.location.search);

      updater(params);

      if (options?.resetPage) {
        params.set("page", "1");
        setOptimisticPaginationState((prev) => ({
          pageIndex: 0,
          pageSize: prev.pageSize,
        }));
      }

      updateUrlAndRefresh(params);
    },
    [updateUrlAndRefresh]
  );

  // -----------------------------
  // Sorting handler
  // -----------------------------
  const handleSortingChange = useCallback(
    (state: SortingState) => {
      setOptimisticSortingState(state);

      updateParams(
        (params) => {
          const nextSorting = state[0];

          if (nextSorting) {
            params.set("sortBy", nextSorting.id);
            params.set("sortOrder", nextSorting.desc ? "desc" : "asc");
            return;
          }

          params.delete("sortBy");
          params.delete("sortOrder");
        },
        { resetPage: true }
      );
    },
    [updateParams]
  );

  // -----------------------------
  // Pagination handler
  // -----------------------------
  const handlePaginationChange = useCallback(
    (state: PaginationState) => {
      setOptimisticPaginationState(state);

      updateParams((params) => {
        params.set("page", String(state.pageIndex + 1));
        params.set("limit", String(state.pageSize));
      });
    },
    [updateParams]
  );

  return {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  };
};