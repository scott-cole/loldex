import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getAllChampions } from "../app/features/championsSlice";

export const Data = () => {
    const dispatch = useAppDispatch()

    const champions = useAppSelector(state => state.champions.data)
    useEffect(() => {
    dispatch(getAllChampions())
    },[dispatch])

    console.log(champions)
    return <div>Data:</div>;
}