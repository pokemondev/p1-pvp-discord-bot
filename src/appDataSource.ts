import Discord = require('discord.js');
import { Command } from './commands/command';
import { PokemonDb } from './pokemon/pokemonDb';
import { RankService } from './pokeone/rankService';

export class AppDataSource {
  private commands = new Discord.Collection<string, Command>();
  
  public PvpRankDb = new RankService();
  public pokemonDb = new PokemonDb();

  public get botCommands() { return this.commands; }
  public set botCommands(cmds) { this.commands = cmds; }
}