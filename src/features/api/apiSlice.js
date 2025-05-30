import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = import.meta.env.VITE_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/` }),
  endpoints: (builder) => ({
    getDeeplink: builder.query({
      query: (uuid) => `deeplink/${uuid}`,
    }),
  }),
});

export const { useGetDeeplinkQuery } = apiSlice;
