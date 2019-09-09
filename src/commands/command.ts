import Discord = require('discord.js');

export interface Command {
  name: string;
  description: string;
  aliases: string[];
	execute(message, args);
}
