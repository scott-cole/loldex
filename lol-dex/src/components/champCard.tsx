import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllChampions } from "../app/features/championsSlice";
import Image from "next/image";

export const ChampCard = () => {
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState("");
    const [championData, setChampionData] = useState(null);
    const champions = useAppSelector((state: { champions: { data: { [key: string]: any } | null } }) => state.champions);

    useEffect(() => {
        dispatch(getAllChampions());
    }, [dispatch]);

    const searchForChampion = () => {
        if (champions.data?.data) {
            const champion = Object.values(champions.data.data).find((champ: any) => 
                champ.name.toLowerCase() === searchText.toLowerCase()
            );
            setChampionData(champion);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Image
              className="dark:invert"
              src="/lol.svg"
              alt="Lol Logo"
              width={180}
              height={38}
              priority
            />
            <div className="mb-4">
                <input 
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setSearchText(e.target.value)} 
                    type="search" 
                    placeholder="Search..." 
                    value={searchText}
                />
                <button 
                    className="ml-2 p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={searchForChampion} 
                    type="submit"
                >
                    Search
                </button>
            </div>
            {championData ? (
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                    <img className="w-full h-48 object-cover mb-4" src={"https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/" + `${championData.name}` + ".png"} alt={championData.name} />
                    <h2 className="text-xl font-bold mb-2">{championData.name}</h2>
                    <p className="text-gray-700 mb-2">{championData.title}</p>
                    <p className="text-gray-600 mb-4">{championData.blurb}</p>
                    <ul className="text-gray-600">
                        <li>Attack: {championData.info.attack}</li>
                        <li>Defense: {championData.info.defense}</li>
                        <li>Magic: {championData.info.magic}</li>
                        <li>Difficulty: {championData.info.difficulty}</li>
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};