import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const championsAPI = createApi({
    reducerPath: "championsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://ddragon.leagueoflegends.com/" }),
    endpoints: (builder) => ({
        getAllChampions: builder.query({
            query: () => "cdn/14.23.1/data/en_US/champion.json/",
        }),
        getChampion: builder.query({
            query: ( champion ) => `cdn/14.23.1/data/en_US/champion/search?q=${champion}.json`
        })
    }),
});

export const { useGetAllChampionsQuery, useGetChampionQuery } = championsAPI;