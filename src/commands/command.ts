import Discord = require('discord.js');
import { AppDataSource } from "../appDataSource";
import { ColorService } from '../pokemon/colorService';
import { Pokemon } from '../pokemon/models';

export interface Command {
  name: string;
  description: string;
  aliases: string[];
	execute(message, args);
}
