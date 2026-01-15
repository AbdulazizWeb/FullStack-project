import { baseApi } from "@/shared/api/base-api";
import type { Role } from "../model/role-type";

const roleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRoles: build.query<Role, void>({
      query: () => ({
        url: "/role/all",
      }),
    }),
  }),
});

export const { useGetAllRolesQuery } = roleApi;
