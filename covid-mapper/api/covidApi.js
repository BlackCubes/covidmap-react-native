import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { capitalize, cartesianCoordinateConverter } from "../utils";

export const covidApi = createApi({
  reducerPath: "covidApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://disease.sh/v3/covid-19/`,
  }),
  endpoints: (builder) => ({
    // WORLDOMETERS - Global
    getGlobalCovidStats: builder.query({
      query: () => `all`,
      transformResponse: (response) => ({
        cases: response.cases,
        deaths: response.deaths,
        recovered: response.recovered,
        hasTimelineSequence: typeof response.cases === "number" ? false : true,
        provinces: "",
        state: "",
        county: "",
      }),
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
      transformResponse: (response) =>
        response.map((state) => ({
          cases: state.cases,
          deaths: state.deaths,
          recovered: state.recovered ?? "No info",
          hasTimelineSequence: typeof state.cases === "number" ? false : true,
          provinces: "",
          state: state.state,
          county: "",
        })),
    }),
    getTotalOneUSState: builder.query({
      // get total from one particular US state
      query: (usState) => {
        const endpoint = !usState
          ? "not-chosen"
          : !usState.length
          ? "not-chosen"
          : usState;

        return `states/${endpoint}`;
      },
      transformResponse: (response) => ({
        cases: response.cases,
        deaths: response.deaths,
        recovered: response.recovered,
        hasTimelineSequence: typeof response.cases === "number" ? false : true,
        provinces: "",
        state: response.state,
        county: "",
      }),
    }),

    // JHUCSSE - Provinces, US Counties
    getAllCountriesProvincesHistorical: builder.query({
      query: () => "historical/all",
      transformResponse: (response) => ({
        cases: cartesianCoordinateConverter(response.cases),
        deaths: cartesianCoordinateConverter(response.deaths),
        recovered: cartesianCoordinateConverter(response.recovered),
        hasTimelineSequence: typeof response.cases === "number" ? false : true,
        provinces: "",
        state: "",
        county: "",
      }),
    }),
    getCountryHistorical: builder.query({
      query: (country) => {
        const endpoint = !country
          ? "not-chosen"
          : !country.length
          ? "not-chosen"
          : country;
        return `historical/${endpoint}`;
      },
      transformResponse: (response) => ({
        cases: cartesianCoordinateConverter(response.timeline.cases),
        deaths: cartesianCoordinateConverter(response.timeline.deaths),
        recovered: cartesianCoordinateConverter(response.timeline.recovered),
        hasTimelineSequence:
          typeof response.timeline.cases === "number" ? false : true,
        provinces: response.province
          .map((val) => capitalize(val, true))
          .join(", "),
        state: "",
        county: "",
      }),
    }),
    getCountriesHistorical: builder.query({
      query: (countries) => `historical/${countries.join(",")}`,
    }),
    getProvinceHistorical: builder.query({
      query: ({ country, province }) => {
        const countryEndpoint = !country
          ? "not-chosen"
          : !country.length
          ? "not-chosen"
          : country;

        const provinceEndpoint = !province
          ? "not-chosen"
          : !province.length
          ? "not-chosen"
          : province;

        return `historical/${countryEndpoint}/${provinceEndpoint}`;
      },
      transformResponse: (response) => ({
        cases: cartesianCoordinateConverter(response.timeline.cases),
        deaths: cartesianCoordinateConverter(response.timeline.deaths),
        recovered: cartesianCoordinateConverter(response.timeline.recovered),
        hasTimelineSequence:
          typeof response.timeline.cases === "number" ? false : true,
        provinces: capitalize(response.province, true),
        state: "",
        county: "",
      }),
    }),
    getProvincesHistorical: builder.query({
      query: ({ country, provinces }) =>
        `historical/${country}/${provinces.join(",")}`,
    }),
    getAllUSCountiesFromState: builder.query({
      query: (usState) => {
        const endpoint = !usState
          ? "not-chosen"
          : !usState.length
          ? "not-chosen"
          : usState;

        return `historical/usacounties/${endpoint}`;
      },
      transformResponse: (response) =>
        response.map((county) => ({
          cases: cartesianCoordinateConverter(county.timeline.cases),
          deaths: cartesianCoordinateConverter(county.timeline.deaths),
          recovered: cartesianCoordinateConverter(county.timeline.recovered),
          hasTimelineSequence:
            typeof county.timeline.cases === "number" ? false : true,
          provinces: "",
          state: "",
          county: capitalize(county.county, true),
        })),
    }),

    // VACCINES
    getVaccinesTrialData: builder.query({
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
  useGetTotalOneUSStateQuery,
  useGetAllCountriesProvincesHistoricalQuery,
  useGetAllUSCountiesFromStateQuery,
  useGetCountryHistoricalQuery,
  useGetCountriesHistoricalQuery,
  useGetProvinceHistoricalQuery,
  useGetProvincesHistoricalQuery,
  useGetVaccinesTrialDataQuery,
  useGetTotalPeopleVaccinatedGlobalQuery,
  useGetTotalPeopleVaccinatedByCountriesQuery,
  useGetTotalPeopleVaccinatedByCountryQuery,
  useGetTotalPeopleVaccinatedByStatesQuery,
  useGetTotalPeopleVaccinatedByStateQuery,
} = covidApi;
