import { baseApi } from "@/shared/api/base-api";
import type { ReportType } from "../model/types";

const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllReports: build.query<ReportType, void>({
      query: () => ({
        url: "/report/all",
      }),
    }),
  }),
});

export const { useGetAllReportsQuery } = reportsApi;
