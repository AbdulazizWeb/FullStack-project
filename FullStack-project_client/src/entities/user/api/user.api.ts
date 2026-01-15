import { baseApi } from "@/shared/api/base-api";
import type { UserType } from "../model/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<UserType, void>({
      query: () => ({
        url: "/user/all",
      }),
      providesTags: ["Users"],
    }),
    addUser: build.mutation<void, Omit<UserType, "id">>({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    editUser: build.mutation<void, UserType>({
      query: (body) => ({
        url: "/user",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;
