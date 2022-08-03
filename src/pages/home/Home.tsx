import React, {useEffect, useState} from "react"

import {useDebounce} from "../../hooks/useDebounce"
import {useLazyGetUserRepositoriesQuery, useSearchUsersQuery} from "../../store/github/githyb.api"
import {IRepositoriesData, IUser} from "../../models";


const Home = () => {

    const [search, setSearch] = useState("")
    const debounceSearchString = useDebounce(search)
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const [getUserRepositories, {isLoading: areReposLoading, data: repositories}] = useLazyGetUserRepositoriesQuery()

    const {isError, isLoading, data: users} = useSearchUsersQuery(debounceSearchString, {
        skip: debounceSearchString.length < 3,
        refetchOnFocus: true
    })

    useEffect(() => {
        users && setIsDropdownVisible(debounceSearchString.length > 3 && users.length > 0)
    }, [debounceSearchString, users])

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const onClickHandler = (userName: string) => () => {
        getUserRepositories(userName)
        setSearch("")
        setIsDropdownVisible(false)
    }

    const usersList = users?.map((user: IUser) => (
        <li
            key={user.id}
            onClick={onClickHandler(user.login)}
            className="px-2 py-4 hover:bg-gray-500 hover:text-white transition-colors"
        >
            {user.login}
        </li>))

    const repositoriesList = repositories?.map((repository: IRepositoriesData) => (
        <li key={repository.id}>{repository.name}</li>
    ))

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
            {isError && <p className="text-center text-red-600 ">{"Something went wrong!"}</p>}

            <div className="relative w-[560px]">
                <input type={"text"}
                       className="border py-2 px-4 w-full h-[42px] mb-2"
                       placeholder={"Search for github username..."}
                       value={search}
                       onChange={onChangeHandler}
                       onFocus={()=>setIsDropdownVisible(true)}
                />
                <ul className="list-none absolute top-[42px] left-0 right-0  max-h-[200px] overflow-y-scroll shadow-md">
                    {isLoading && <p className="text-center">{"Loading..."}</p>}
                    {
                        isDropdownVisible && usersList
                    }
                </ul>
                <div className="container">
                    {areReposLoading && <p>{"Repositories is loading..."}</p>}
                    {
                        repositoriesList
                    }
                </div>
            </div>
        </div>
    )
}

export default Home