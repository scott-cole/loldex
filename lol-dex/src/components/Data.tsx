import { useGetChampionQuery } from "@/app/api/apiSlice"

export const Data = () => {
    // const { data: allChampionsData } = useGetAllChampionsQuery();
    const { data: championData } = useGetChampionQuery("Aatrox");

    console.log(championData, 'data')
    return <div>Data:</div>;
}