import * as cnfg from "dotenv";
cnfg.config();

import path from "path";
import { CommandHandler } from "@mengkodingan/ckptw";
import { z } from "zod";
import BotClient from "@classes/BotClient";

function commandHandler(bot: BotClient) {
	const cmd = new CommandHandler(bot, path.resolve(__dirname, "../app/commands"));
	cmd.load();

	function isValidStructure(obj: any): boolean {
		const commandSchema = z.object({
			name: z.string(),
			aliases: z.optional(z.array(z.string())),
			code: z.function()
		});

		return commandSchema.safeParse(obj).success;
	}

	bot.cmd = bot.cmd?.filter(isValidStructure);
}

export default async function main(): Promise<BotClient> {
	const bot: BotClient = new BotClient({
		prefix: ".",
		usePairingCode: true,
		printQRInTerminal: false,
		phoneNumber: process.env.PHONE_NUMBER,
		readIncommingMsg: true,
		selfReply: true,
	});

	commandHandler(bot);

	await bot.launch();
	return bot;
}
