import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

import {IRepositoriesData, IUser} from "../../models/";
import {IServerResponse} from "../../models/";

export const githubApi = createApi({
    refetchOnFocus: true,
    reducerPath: "github/api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.github.com/",
    }),
    endpoints: build => ({
        searchUsers: build.query<IUser[], string>({
            query: (name) => ({
                url: `/search/users`,
                params: {
                    q: name,
                    per_page: 10
                }
            }),
            transformResponse: (response:IServerResponse<IUser>) => response.items
        }),
        getUserRepositories: build.query<IRepositoriesData[], string>({
            query: userName => ({
                url: `users/${userName}/repos`
            })
        })
    })
});

export const {useSearchUsersQuery, useLazyGetUserRepositoriesQuery} = githubApi;