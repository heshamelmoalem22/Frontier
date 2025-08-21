import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { isLoading, data: { data: bookings, count } = {}, error } =
    useQuery({
      queryKey: ["bookings", filter, sortBy, page],
      queryFn: () => getBookings({ filter, sortBy, page }),
    });

  
  useEffect(() => {
    if (page === 3) {
      [1, 2].forEach((p) => {
        queryClient.removeQueries({
          queryKey: ["bookings", filter, sortBy, p],
        });
      });
    }
    if (page === 1) {
      [2, 3].forEach((p) => {
        queryClient.removeQueries({
          queryKey: ["bookings", filter, sortBy, p],
        });
      });
    }
  }, [page, filter, sortBy, queryClient]);

  return { isLoading, bookings, error, count };
}
