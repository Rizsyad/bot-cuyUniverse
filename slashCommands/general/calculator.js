module.exports = {
    name: "calculator",
    description: "Count number with calculator",
    category: "general",
    run: async (client, interaction, args) => {
        const simplydjs = require("simply-djs");
        simplydjs.e;
        simplydjs.calculator(interaction, {
            embed: {
                footer: {
                    text: "Have fun with the calculator",
                    iconURL: client.user.displayAvatarURL(),
                },
                color: "#075FFF",
                credit: false,
            },
        });
    },
};
