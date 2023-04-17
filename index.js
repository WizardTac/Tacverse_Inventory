const Discord = require('discord.js');
const { Client, GatewayIntentBits, InteractionReplyOptions, MessageAttachment, AttachmentBuilder, ActivityType} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
    ]
})
const checkItems = require('./cmd/checkitems.js');
const addItem = require('./cmd/additem.js');
//const createBoss = require ('./cmd/createboss.js');

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const data = await client.application.commands.create(addItem);
    const data2= await client.application.commands.create(checkItems);
    //const data3= await client.application.commands.create(createBoss);

    console.log(data, data2);

    client.user.setPresence({
        activities: [{ name: 'your Inventory', type: ActivityType.Watching }],
        status: 'available',
    });

    console.log(`finished starting bot ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {

    console.log('interaction created');
    if (!interaction.isCommand()) return;

    const { commandName, options, user} = interaction;

    console.log(`${user.username}#${user.discriminator} (${user.id}) ran command "${commandName}"`);

    // -------------------------------------- ADDITEM ---------------------------------

    if (commandName === 'additem') {
        addItem.execute(interaction);
    };

    // ----------------------------------- CHECKITEMS ---------------------------------

    if (commandName === 'checkitems') {
        checkItems.execute(interaction);
    };

    // ----------------------------------- CREATEBOSS ---------------------------------

   // if (commandName === 'createboss') {
   //     createBoss.execute(interaction);
   // };

}),

client.login('token-goes-here')
