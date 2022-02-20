import { Collection } from 'discord.js';
import chalk from 'chalk';
import fs from 'fs';
import { Btn } from './types/btn';

const log = console.log;

export default function readButtons(
	rootDir: string,
	collection: Collection<string, Btn>
) {
	fs.readdirSync(`${rootDir}\\btns`, { withFileTypes: true }).forEach(file => {
		if (file.name.endsWith('.js')) {
			import(`${rootDir}\\btns\\${file.name}`).then(button => {
				const btn: Btn = button.default;
				log(chalk.blue(`[CLIENT]: Loaded button: ${btn.id}`));
				collection.set(btn.id, btn);
			});
		}
	});
}
