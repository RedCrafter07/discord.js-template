import Discord, { Collection } from 'discord.js';
import chalk from 'chalk';

import { GLOBAL, MAIN_GUILD, TOKEN } from './config';
import { Cmd } from './lib/types/cmd';
import readCommands from './lib/commandReader';
import { Btn } from './lib/types/btn';
import readButtons from './lib/buttonReader';

const log = console.log;

const commands = new Collection<string, Cmd>();
const buttons = new Collection<string, Btn>();

const client = new Discord.Client({ intents: [ 'GUILDS', 'GUILD_MEMBERS' ] });

readCommands(__dirname, commands);
readButtons(__dirname, buttons);

client.on('ready', async () => {
	if (!client.user) {
		process.exit(1);
	}

	const cmdData = commands.map(cmd => cmd.data);

	log(chalk.yellow('[CLIENT]: Registering commands...'));

	if (GLOBAL == false) {
		const guild = await client.guilds.cache.get(MAIN_GUILD);
		if (!guild) throw new Error('Main guild not found!');

		await guild.commands.set(cmdData);
	} else {
		const application = client.application;
		if (!application) throw new Error('Application not found!');

		await application.commands.set(cmdData);
	}

	log(chalk.yellow('[CLIENT]: Commands registered!'));

	log(chalk.green(`[CLIENT]: Logged in as ${client.user.tag}!`));
});

client.on('interactionCreate', async i => {
	if (i.isCommand()) {
		const cmd = commands.get(i.commandName);
		if (cmd) {
			try {
				await cmd.exec(i);
			} catch (e) {
				await i.reply({
					content: `An error occured while executing the command: ${e}`,
					ephemeral: true,
				});
			}
		} else {
			await i.reply({
				content: `Command not found: ${i.commandName}`,
				ephemeral: true,
			});
		}
	} else if (i.isButton()) {
		const btn = buttons.get(i.customId);
		if (btn) {
			try {
				await btn.exec(i);
			} catch (e) {
				await i.reply({
					content: `An error occured while executing the button: ${e}`,
					ephemeral: true,
				});
			}
		} else {
			await i.reply({
				content: `Button not found: ${i.customId}`,
				ephemeral: true,
			});
		}
	}
});

client.login(TOKEN);
