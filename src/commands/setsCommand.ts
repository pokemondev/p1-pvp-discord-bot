import Discord = require('discord.js');
import { AppDataSource } from "../appDataSource";
import { ColorService } from "../pokemon/colorService";
import { Prefix } from '../common/config';

export class SetsCommand {
  name = "sets";
  description = "Lists all Pokeone viability ranks";
  aliases = ['s', 'set'];

  dataSource: AppDataSource;

  constructor(dataSource: AppDataSource) {
    this.dataSource = dataSource;
  }

  get usage() { return `${Prefix}${this.name} <pokémon name>`; }

  execute(message: any, args: any) {

    if (!args.length) {
      let reply = `You didn't provide the Pokémon, ${message.author}!`;
      reply += `\nThe proper usage would be: \`${this.usage}\``;
      reply += `\neg.:`;
      reply += `\n${Prefix}${this.name} suicune`;
      reply += `\n${Prefix}${this.name} alakazam`;
      message.channel.send(reply);
      return;
    }

    const pokemonName = args.join(' ');
    const pokemon = this.dataSource.pokemonDb.getPokemon(pokemonName);
    if (!pokemon) {
      message.channel.send(`Could not find moveset for the provided Pokémon: '${pokemonName}', ${message.author}!`);
      return;
    }

    var pokemonRank = this.dataSource.PvpRankDb.getPokemon(pokemon.name);
    if (!pokemonRank) {
      message.channel.send(`Could not find the Viability Rank for the provided rank: '${args[0]}', ${message.author}!`);
      return;
    }

    const embed = new Discord.RichEmbed()
      .setColor(ColorService.getColorForType(pokemon.type1))
      .setThumbnail(`https://play.pokemonshowdown.com/sprites/bw/${pokemon.name.toLowerCase()}.png`)
      .setFooter(`Details on ${(pokemonRank.movesetLink || 'https://pokeonecommunity.com/index.php?mod=articles&action=view&id=75' )}`)

    pokemonRank.movesets.forEach((set, i) => {
      embed.addField(`${i+1}º set`, `${set}\u2006`, true);
    });

    const msgHeader = `**__PokéOne PVP sets for: ${pokemon.name}__**`;
    message.channel.send(msgHeader, embed);
  }
}
