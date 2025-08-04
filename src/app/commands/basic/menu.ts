import { ICommandOptions, Ctx } from "@mengkodingan/ckptw";

const command: ICommandOptions = {
  name: "menu",
  code: async (ctx: Ctx) => {
    await ctx.reply("Menampilkan menu!");
  },
};

module.exports = { ...command };
