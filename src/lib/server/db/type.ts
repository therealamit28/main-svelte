
export type Player = {
    totalPay: number;
    playerName: string;
    nameId: number;
    
  };
  
  export type PlayerId = {
    playerPay: number;
    playerName: string;
    nation: string;
    name_id: number;
    Imageurl: string;
  };

  export type Lang={
    Language: string;
    Year: number;
    Ranking: number;
  };
  
  export interface LangRow {
    Language: string;
    Year: number;
    Ranking: number;
  }