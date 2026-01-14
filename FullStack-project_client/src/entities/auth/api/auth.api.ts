import { baseApi } from "@/shared/api/base-api";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<string, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
