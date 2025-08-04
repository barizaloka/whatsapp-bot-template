import { ICommandOptions, Ctx } from "@mengkodingan/ckptw";

const command: ICommandOptions = {
  name: "ping",
  aliases: ["p"],
  code: async (ctx: Ctx) => {
    await ctx.reply("Pong!");
  },
};

module.exports = { ...command };