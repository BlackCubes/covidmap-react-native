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
        country: "",
        provinces: "",
        state: "",
        county: "",
        updatedAt: response.cases ?? 0,
        population: response.population ?? 0,
      }),
    }),
    getEachCountriesTotals: builder.query({
      // get totals for all countries
      query: () => `countries`,
    }),
    getSpecificCountryTotal: builder.query({
      // get totals for a specific country
      query: (country) => `countries/${country.toLowerCase()}`,
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
          country: "",
          provinces: "",
          state: state.state,
          county: "",
          updatedAt: response.cases ?? 0,
          population: response.population ?? 0,
        })),
    }),
    getTotalOneUSState: builder.query({
      // get total from one particular US state
      query: (usState) => {
        const endpoint = !usState
          ? "not-chosen"
          : !usState.length
          ? "not-chosen"
          : usState.toLowerCase();

        return `states/${endpoint}`;
      },
      transformResponse: (response) => ({
        cases: response.cases,
        deaths: response.deaths,
        recovered: response.recovered,
        hasTimelineSequence: typeof response.cases === "number" ? false : true,
        country: "",
        provinces: "",
        state: response.state,
        county: "",
        updatedAt: response.cases ?? 0,
        population: response.population ?? 0,
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
        country: "",
        provinces: "",
        state: "",
        county: "",
        updatedAt: response.cases ?? 0,
        population: response.population ?? 0,
      }),
    }),
    getCountryHistorical: builder.query({
      query: (country) => {
        const endpoint = !country
          ? "not-chosen"
          : !country.length
          ? "not-chosen"
          : country.toLowerCase();
        return `historical/${endpoint}`;
      },
      transformResponse: (response) => ({
        cases: cartesianCoordinateConverter(response.timeline.cases),
        deaths: cartesianCoordinateConverter(response.timeline.deaths),
        recovered: cartesianCoordinateConverter(response.timeline.recovered),
        hasTimelineSequence:
          typeof response.timeline.cases === "number" ? false : true,
        country: "",
        provinces: response.province
          .map((val) => capitalize(val, true))
          .join(", "),
        state: "",
        county: "",
        updatedAt: response.cases ?? 0,
        population: response.population ?? 0,
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
        country: "",
        provinces: capitalize(response.province, true),
        state: "",
        county: "",
        updatedAt: response.cases ?? 0,
        population: response.population ?? 0,
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
          : usState.toLowerCase();

        return `historical/usacounties/${endpoint}`;
      },
      transformResponse: (response) =>
        response.map((county) => ({
          cases: cartesianCoordinateConverter(county.timeline.cases),
          deaths: cartesianCoordinateConverter(county.timeline.deaths),
          recovered: cartesianCoordinateConverter(county.timeline.recovered),
          hasTimelineSequence:
            typeof county.timeline.cases === "number" ? false : true,
          country: "",
          provinces: "",
          state: "",
          county: capitalize(county.county, true),
          updatedAt: response.cases ?? 0,
          population: response.population ?? 0,
        })),
    }),
    getUSCountyCoordinates: builder.query({
      query: (county) => {
        const endpoint = !county
          ? "not-chosen"
          : !county.length
          ? "not-chosen"
          : county.toLowerCase();
        return `jhucsse/counties/${endpoint}`;
      },
      transformResponse: (response) =>
        response.map((countyObj) => {
          const { province, coordinates, county, updatedAt, stats } = countyObj;
          return {
            state: province,
            county,
            coordinates,
            updatedAt,
            stats,
          };
        }),
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
      transformResponse: (response) =>
        response.map((country) => ({
          cases: cartesianCoordinateConverter(country.timeline),
          deaths: [],
          recovered: [],
          hasTimelineSequence:
            typeof country.timeline === "number" ? false : true,
          country: country.country,
          provinces: "",
          state: "",
          county: "",
          updatedAt: country.updatedAt ?? 0,
          population: country.population ?? 0,
        })),
    }),
    getTotalPeopleVaccinatedByCountry: builder.query({
      query: (country) => {
        const endpoint = !country
          ? "not-chosen"
          : !country.length
          ? "not-chosen"
          : country.toLowerCase();

        return `vaccine/coverage/countries/${endpoint}`;
      },
      transformResponse: (response) => ({
        cases: cartesianCoordinateConverter(response.timeline),
        deaths: [],
        recovered: [],
        hasTimelineSequence:
          typeof response.timeline === "number" ? false : true,
        country: "",
        provinces: "",
        state: "",
        county: "",
        updatedAt: response.updatedAt ?? 0,
        population: response.population ?? 0,
      }),
    }),
    getTotalPeopleVaccinatedByStates: builder.query({
      query: () => `vaccine/coverage/states`,
      transformResponse: (response) =>
        response.map((state) => ({
          cases: cartesianCoordinateConverter(state.timeline),
          deaths: [],
          recovered: [],
          hasTimelineSequence:
            typeof state.timeline === "number" ? false : true,
          country: "",
          provinces: "",
          state: state.state,
          county: "",
          updatedAt: response.updatedAt ?? 0,
          population: response.population ?? 0,
        })),
    }),
    getTotalPeopleVaccinatedByState: builder.query({
      query: (state) => {
        const endpoint = !state
          ? "not-chosen"
          : !state.length
          ? "not-chosen"
          : state.toLowerCase();

        return `vaccine/coverage/states/${endpoint}`;
      },
      transformResponse: (response) => ({
        cases: cartesianCoordinateConverter(response.timeline),
        deaths: [],
        recovered: [],
        hasTimelineSequence:
          typeof response.timeline === "number" ? false : true,
        country: "",
        provinces: "",
        state: "",
        county: "",
        updatedAt: response.updatedAt ?? 0,
        population: response.population ?? 0,
      }),
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
  useGetUSCountyCoordinatesQuery,
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
