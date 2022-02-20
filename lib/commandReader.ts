import { Cmd } from './types/cmd';
import { Collection } from 'discord.js';
import chalk from 'chalk';
import fs from 'fs';

const log = console.log;

export default function readCommands(
	rootDir: string,
	collection: Collection<string, Cmd>
) {
	fs.readdirSync(`${rootDir}\\cmds`, { withFileTypes: true }).forEach(file => {
		if (file.name.endsWith('.js')) {
			import(`${rootDir}\\cmds\\${file.name}`).then(command => {
				const cmd: Cmd = command.default;
				log(chalk.blue(`[CLIENT]: Loaded command: ${cmd.data.name}`));
				collection.set(cmd.data.name, cmd);
			});
		}
	});
}
