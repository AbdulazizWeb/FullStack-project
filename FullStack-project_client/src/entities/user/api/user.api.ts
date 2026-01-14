import { baseApi } from "@/shared/api/base-api";
import type { UserType } from "../model/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<UserType, void>({
      query: () => ({
        url: "/User/all",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
