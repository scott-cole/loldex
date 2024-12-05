import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllChampions } from "../app/features/championsSlice";
import { Champion, ChampionsState } from "@/app/features/types"
import { BASE_URL } from '../app/features/championsSlice';
import Image from "next/image";

export const ChampCard = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  const [championData, setChampionData] = useState<Champion | null>(null);
  
  const { data, loading, error } = useAppSelector((state: { champions: ChampionsState }) => state.champions);

  useEffect(() => {
    if (championData?.blurb) {
        let message= `${championData?.blurb}`;
        let utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
    }
    return;
  },[championData?.blurb])

  useEffect(() => {
    dispatch(getAllChampions());
  }, [dispatch]);

  const searchForChampion = () => {
    if (data && data.data) {
      const champion = Object.values(data.data).find((champ: Champion) => 
        champ.name.toLowerCase() === searchText.toLowerCase()
      );
      
      if (champion) {
        setChampionData(champion);
      } else {
        setChampionData(null);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4">
        <Image
          className="mb-8"
          src="/lol.svg"
          alt="Lol Logo"
          width={350}
          height={58}
          priority
        />
        <div>
          <input 
            className="p-2 w-64 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            onChange={(e) => setSearchText(e.target.value)} 
            type="search" 
            placeholder="Search..." 
            value={searchText}
          />
          <button 
            className="ml-4 p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none"
            onClick={searchForChampion} 
            type="submit"
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : championData ? (
        <div className="p-6 rounded-lg shadow-lg max-w-sm">
          <img 
            className="w-full h-full object-cover mb-4" 
            src={`${BASE_URL}/img/champion/${championData.name}.png`} 
            alt={championData.name} 
          />
          <h2 className="text-xl font-bold mb-2">{championData.name}</h2>
          <p className="text-gray-700 mb-2 italic">{championData.title}</p>
          <p className="text-gray-700 mb-2">Type: {championData.tags}</p>
          <p className="text-gray-600 mb-4">{championData.blurb}</p>
          <div className='flex justify-between'>
            <ul className="text-gray-600">
                <li>Attack: {championData.info.attack}</li>
                <li>Defense: {championData.info.defense}</li>
                <li>Magic: {championData.info.magic}</li>
                <li>Difficulty: {championData.info.difficulty}</li>
            </ul>
            <ul className="text-gray-600">
                <li>HP: {championData.stats.hp}</li>
                <li>Attack Damage: {championData.stats.attackdamage}</li>
                <li>Magic Power: {championData.stats.mp}</li>
                <li>Armor: {championData.stats.armor}</li>
                <li>Magic Resist: {championData.stats.spellblock}</li>
            </ul>
          </div>
        </div>
      ) : (
        <p>No champion found with that name.</p>
      )}
    </div>
  );
};
