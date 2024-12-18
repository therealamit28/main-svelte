import Database from "better-sqlite3";
import type { Player, PlayerId, Lang,LangRow} from './type.ts';
const db = new Database('./data/Test.db',{
    verbose: console.log});


    export function getPlayer(name_id: number): Player | null {
const sql = `SELECT Name_ID AS nameId,
    Name AS playerName,
    Nation AS nation
    FROM alldata
    WHERE Name_ID=?;`;

    const stmt = db.prepare(sql);
    const row = stmt.get([name_id]);
    return row as Player | null;
  }
  




    export function getPlayerByIdName(name_id: number, playerName: string): PlayerId |null {
    const sql = `SELECT 
    Name_ID AS nameId,
    Name AS playerName,
    (SUBSTR(Name, 1, INSTR(Name, ' ') - 1) || '-' || SUBSTR(Name, INSTR(Name, ' ') + 1)) AS playerNameHypen,
    Nation AS nation,
    TotalPay As playerPay,
    Image AS Imageurl
FROM 
    alldata
    WHERE Name_ID = ? AND LOWER (playerNameHypen) = ?;`;

const stmt = db.prepare(sql);
const row = stmt.get([name_id,playerName]);
return row  as PlayerId | null;

    }


    export function topPlayer(LIMIT = 15): Player[] {
    const sql= ` SELECT 
    Name_ID as nameId, name AS playerName,
      CAST(REPLACE(SUBSTRING(TotalPay, 2), ',', '') AS INTEGER) AS totalPay
    FROM 
      alldata
    ORDER BY 
    totalPay DESC
    LIMIT ?;`

    const stmt = db.prepare(sql);
const row = stmt.all(LIMIT);
return row as Player[];
    }



    export function searchPlayer(match: string, limit = 5): Player[] {
      const searchTerm=match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

      if (searchTerm.length < 3) {
        return [];
      }

    const sql=`SELECT Name_ID AS nameId,
       name AS playerName,
       CAST(REPLACE(SUBSTRING(TotalPay, 2), ',', '') AS INTEGER) AS totalPay
FROM alldata
WHERE lower(name) LIKE '%' || lower($searchTerm) || '%'
ORDER BY totalPay DESC
LIMIT $limit;`



const stmt = db.prepare(sql);
const row = stmt.all({searchTerm, limit});
return row as Player[];


    }
    const getLanguageDataQuery = (numLanguages: number) => `
    SELECT Language, Year, Ranking
    FROM Mylangs
    WHERE Language COLLATE NOCASE IN (${Array(numLanguages).fill('?').join(',')})
`;

export function getLanguageData(languages:string[]):Lang[]|null{
  if (languages.length===0) return null;
  const sql = getLanguageDataQuery(languages.length);
  const stmt = db.prepare(sql);
  const rows = stmt.all(languages) as LangRow[];

  return rows.map(row => ({
    Language: row.Language,
    Year: row.Year,
    Ranking: row.Ranking
  })) as Lang[];
}