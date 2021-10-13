import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const covidApi = createApi({
  reducerPath: "covidApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://disease.sh/v3/covid-19/`,
  }),
  endpoints: (builder) => ({
      getGlobalCovidStats: builder.query({
          query: () => `all`
      })
  })
});

export const { useGetGlobalCovidStatsQuery } = covidApi;
