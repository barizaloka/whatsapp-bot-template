import * as cnfg from "dotenv";
cnfg.config();

import path from "path";
import { CommandHandler } from "@mengkodingan/ckptw";
import { z } from "zod";
import BotClient from "@classes/BotClient";
import { yellow, green, red, bold, dim, blue, cyan } from 'kleur';

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

    const now = new Date();
    const formattedTime = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    console.log(bold().yellow('====================================================='));
    console.log(bold().yellow('||                                                 ||'));
    console.log(bold().yellow(`||  ${bold().green('          Inisialisasi Bot WhatsApp')}            ||`));
    console.log(bold().yellow('||                                                 ||'));
    console.log(bold().yellow('====================================================='));
    console.log(dim(`[${formattedTime}]`));
    console.log(blue('📦 ' + bold('Versi Bot') + ' : ' + green('0.0.0')));
    console.log(dim('-----------------------------------------------------'));
    console.log(dim('Memuat perintah...'));

    commandHandler(bot);
    
    console.log(bold().green(`✅ banyak perintah berhasil dimuat!`));
    console.log(dim('-----------------------------------------------------'));
    console.log(dim('Menghubungkan ke WhatsApp...'));

    await bot.launch();
    
    return bot;
}