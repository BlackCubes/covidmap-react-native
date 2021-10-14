import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const covidApi = createApi({
  reducerPath: "covidApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://disease.sh/v3/covid-19/`,
  }),
  endpoints: (builder) => ({
    // WORLDOMETERS - Global
    getGlobalCovidStats: builder.query({
      query: () => `all`,
    }),
    getEachCountriesTotals: builder.query({
      // get totals for all countries
      query: () => `countries`,
    }),
    getSpecificCountryTotal: builder.query({
      // get totals for a specific country
      query: (country) => `countries/${country}`,
    }),
    getTotalsAllStatesUS: builder.query({
      // get totals for all US states, sortable(greatest to least) by cases, todayCases, deaths, active
      query: (sortBy) => {
        const sort = sortBy ? `?sort=${sortBy}` : "";
        return `states${sort}`;
      },
    }),
    // JHUCSSE - Provinces, US Counties
    getAllCountriesProvincesHistorical: builder.query({
      query: () => "historical/all",
    }),
    getCountryHistorical: builder.query({
      query: (country) => `historical/${country}`,
    }),
    getCountriesHistorical: builder.query({
      query: (countries) => `historical/${countries.join(",")}`,
    }),
    getProvinceHistorical: builder.query({
      query: (country, province) => `historical/${country}/${province}`,
    }),
    getProvincesHistorical: builder.query({
      query: (country, provinces) =>
        `historical/${country}/${provinces.join(",")}`,
    }),

    // VACCINES
    getAllAvailableVaccines: builder.query({
      query: () => `vaccine`,
    }),
    getTotalPeopleVaccinatedGlobal: builder.query({
      query: () => `vaccine/coverage`,
    }),
    getTotalPeopleVaccinatedByCountries: builder.query({
      query: () => `vaccine/coverage/countries`,
    }),
    getTotalPeopleVaccinatedByCountry: builder.query({
      query: (country) => `vaccine/coverage/countries/${country}`,
    }),
    getTotalPeopleVaccinatedByStates: builder.query({
      query: () => `vaccine/coverage/states`,
    }),
    getTotalPeopleVaccinatedByState: builder.query({
      query: (state) => `vaccine/coverage/states/${state}`,
    }),
  }),
});

export const {
  useGetGlobalCovidStatsQuery,
  useGetEachCountriesTotalsQuery,
  useGetSpecificCountryTotalQuery,
  useGetTotalsAllStatesUSQuery,
  useGetAllCountriesProvincesHistoricalQuery,
  useGetCountryHistoricalQuery,
  useGetCountriesHistoricalQuery,
  useGetProvinceHistoricalQuery,
  useGetProvincesHistoricalQuery,
  useGetAllAvailableVaccinesQuery,
  useGetTotalPeopleVaccinatedGlobalQuery,
  useGetTotalPeopleVaccinatedByCountriesQuery,
  useGetTotalPeopleVaccinatedByCountryQuery,
  useGetTotalPeopleVaccinatedByStatesQuery,
  useGetTotalPeopleVaccinatedByStateQuery,
} = covidApi;
