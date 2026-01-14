import { baseApi } from "@/shared/api/base-api";
import type { PaymentType } from "../model/types";

const paymentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPayments: build.query<PaymentType, void>({
      query: () => ({
        url: "/payment/all",
      }),
    }),
  }),
});

export const { useGetAllPaymentsQuery } = paymentsApi;
