export interface Champion {
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: {
      attack: number;
      defense: number;
      magic: number;
      difficulty: number;
    };
  }
  
  export interface ChampionsResponse {
    data: { [key: string]: Champion };
  }
  
  export interface ChampionsState {
    data: ChampionsResponse | null;
    loading: boolean;
    error: string | null;
  }
  