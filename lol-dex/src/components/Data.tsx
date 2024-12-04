import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllChampions } from "../app/features/championsSlice";

export const Data = () => {
    const dispatch = useAppDispatch();
    const champions = useAppSelector((state: { champions: { data: { [key: string]: any } | null } }) => state.champions);

    useEffect(() => {
        dispatch(getAllChampions());
    }, [dispatch]);

    const lux = champions.data?.data?.Lux;

    return (
        <div>
            <input type="search" placeholder="Search..." />
            <button type="submit">Search</button>
            <h1>Champion: Lux</h1>
            {lux ? (
                <div>
                    <h2>{lux.name}</h2>
                    <p>{lux.title}</p>
                    <p>{lux.blurb}</p>
                    <img src={`insertImageFromApi${lux.image.full}`} alt={lux.name} />
                    <ul>
                        <li>Attack: {lux.info.attack}</li>
                        <li>Defense: {lux.info.defense}</li>
                        <li>Magic: {lux.info.magic}</li>
                        <li>Difficulty: {lux.info.difficulty}</li>
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};