import { RankPokemon, RankSummary } from "./models";
import { FileHelper } from "../common/fileHelper";
import { groupBy } from "../common/mapHelper";

type RankMap = { [name: string]: RankPokemon[] };

export class RankService {
  private rankDb: RankPokemon[];
  private ranksByName: RankMap;

  constructor() {
    this.loadFileData();    
  }

  public getRanks(): RankSummary[] {
    return Object.keys(this.ranksByName).map(k => { return { 
      rank: k.toString(), 
      count: this.ranksByName[k].length 
    } } );
  }

  public getRank(rankPrefix: string): RankPokemon[] {
    const rankName = Object.keys(this.ranksByName)
                           .find(r => r.toLowerCase() == rankPrefix.toLowerCase());
    return this.ranksByName[rankName];
  }

  public getPokemon(name: string): RankPokemon {
    return this.rankDb.find(p => p.name.toLowerCase() == name.toLowerCase());
  }
  

  private loadFileData(): void {
    this.rankDb = FileHelper.loadFileData<RankPokemon[]>("pokeone-viability-ranks.json");
    this.rankDb.forEach(p => {
       p.rank = p.rank.replace(" Rank", "");
    })
    this.ranksByName = groupBy(this.rankDb, "rank") as RankMap;
    console.log(Object.keys(this.ranksByName));
  }
}