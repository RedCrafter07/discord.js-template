import Discord from 'discord.js';

export type Btn = {
	id: string;
	exec: (data: Discord.ButtonInteraction) => Promise<void>;
};
