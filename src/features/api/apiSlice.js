import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://4pay.win/api/v1/" }),
  endpoints: (builder) => ({
    getDeeplink: builder.query({
      query: (uuid) => `deeplink/${uuid}`,
    }),
  }),
});

export const { useGetDeeplinkQuery } = apiSlice;
