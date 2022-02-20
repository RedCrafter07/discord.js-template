import Discord from 'discord.js';

export type Cmd = {
	data: Discord.ApplicationCommandData;
	exec: (data: Discord.CommandInteraction) => Promise<void>;
};
