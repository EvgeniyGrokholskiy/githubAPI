import {useEffect, useState} from "react";

export const useDebounce = (searchString: string, delay = 300): string => {

    const [state, setState] = useState(searchString)

    useEffect(() => {
        const handler = setTimeout(() => setState(searchString), delay)
        return () => clearTimeout(handler)
    }, [searchString, delay])

    return state;
}