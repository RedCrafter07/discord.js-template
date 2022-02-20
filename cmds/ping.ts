import { Cmd } from '../lib/types/cmd';

const ping: Cmd = {
	data: {
		name: 'ping',
		description: 'Pong!',
		type: 'CHAT_INPUT',
	},
	async exec(i) {
		await i.reply({ content: `Pong! ${i.client.ws.ping}ms latency.` });
	},
};

export default ping;
