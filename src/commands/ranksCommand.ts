import Discord = require('discord.js');
import { AppDataSource } from "../appDataSource";
import { ColorService } from "../pokemon/colorService";

export class RanksCommand {
  name = "ranks";
  description = "Lists all Pokeone viability ranks";
  aliases = [ 'r', 'rank' ];
  
  dataSource: AppDataSource;

  constructor(dataSource: AppDataSource) {
    this.dataSource = dataSource;
  }
  
  execute(message: any, args: any) {

    if (!args.length) {
      this.displayRankSummary(message);
    } else {
      this.displayRankPokemonList(message, args);
    }
    
    
  }

  private displayRankSummary(message): void {
    const ranks = this.dataSource.PvpRankDb.getRanks();
    const embed = new Discord.RichEmbed()
      .setColor(ColorService.getColorForRank())
      //.setThumbnail(`https://play.pokemonshowdown.com/sprites/bw/${cmd.pokemon.name.replace(/ /g, '').toLowerCase()}.png`)

    ranks.forEach((r, i) => {
      embed.addField(`${r.rank}`, `Nº of Pokémon: ${r.count}`, true);
    });

    const msgHeader = `**__PokéOne PVP Ranks:__**`;
    message.channel.send(msgHeader, embed);
  }

  private displayRankPokemonList(message: any, args: any): void {
    var pokemonInRank = this.dataSource.PvpRankDb.getRank(args[0]);
    if (!pokemonInRank) {
      message.channel.send(`Could not find the Viability Rank for the provided rank: '${args[0]}', ${message.author}!`);
      return;
    }

    const firstMon = this.dataSource.pokemonDb.getPokemon(pokemonInRank[0].name);

    const embed = new Discord.RichEmbed()
      .setColor(ColorService.getColorForType(firstMon.type1))
      .setThumbnail(`https://play.pokemonshowdown.com/sprites/bw/${firstMon.name.toLowerCase()}.png`)

    pokemonInRank.forEach((mon, i) => {
      embed.addField(`${mon.name}`, `Nº of viable sets: ${mon.movesets.length}`, true);
    });

    const msgHeader = `**__PokéOne PVP ${pokemonInRank[0].rank}__**`;
    message.channel.send(msgHeader, embed);
  }
}
