const Discord = require('discord.js');
const { Client, GatewayIntentBits, InteractionReplyOptions, MessageAttachment, AttachmentBuilder, ActivityType} = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
    ]
})

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
        const additem = {
        name: 'additem',
        description: 'Assign a role to a member',
        options: [
            {
            name: 'member',
            description: 'The member to assign the role to',
            type: 6,
            required: true,
            },
            {
            name: 'item',
            description: 'The item to assign to the member',
            type: 8,
            required: true,
            },
        ],
        };
        const checkitems = {
            name: 'checkitems',
            description: 'View Items of a member.',
            options: [
                {
                name: 'member',
                description: 'The member to assign the role to',
                type: 6,
                required: true,
                },
            ],
        };
    const data = await client.application.commands.create(additem);
    const data2= await client.application.commands.create(checkitems);
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
        const role = options.getRole('item');
        const member = options.getMember('member');

        if(!role && !member) {
            return interaction.reply({
                content: 'Please provide both an item and a member.',
                ephemeral: true
            })
        }
        if (!role) {
            return interaction.reply({
            content: 'Please provide an item.',
            ephemeral: true
            });
        }
        if (!member) {
            return interaction.reply({
            content: 'Please provide a member.',
            ephemeral: true
            });
        }

        try {
            await member.roles.add(role);
            await interaction.reply(`Role ${role.name} assigned to ${member.user.tag}.`);
        } catch (error) {
            console.error(error);
            await interaction.reply({
            content: 'There was an error while assigning the role.',
            ephemeral: true
            });
        }
    }

    // ----------------------------------- CHECKITEMS ---------------------------------

    if (commandName === 'checkitems') {
        const member = options.getMember('member');

        //const carrotSwordIMG = new MessageAttachment(`img/carrotsword.png`);

        if (!member) {
            return interaction.reply({
            content: 'Please provide a member.',
            ephemeral: true
            });
        }

        const memberRoles = member.roles.cache.map(role => role.name);

        const hasAdminRole = memberRoles.includes('TAC-Team');
        const hasASSRole = memberRoles.includes('A.S.S');
        const hasGASSRole = memberRoles.includes('Gold A.S.S');
        const hasCarrotSwordRole = memberRoles.includes('Carrot Sword');
        const hasTACsWizardHatRole = memberRoles.includes('TAC`s Wizard Hat');
        //  const hasItemRole = memberRoles.includes('role_name');

        if(hasASSRole || hasGASSRole || hasCarrotSwordRole || hasTACsWizardHatRole) {
            await interaction.reply({
                content:
                    `__**${member.user.tag}**'s Inventory__

                    ${hasASSRole ? `**A.S.S** item  <:ASS:1096791523850457238>` : ''}
                    ${hasGASSRole ? `**Golden A.S.S** item <:GoldASS:1096791048795193486>` : ''}
                    ${hasCarrotSwordRole ? `**Carrot Sword** item <:CarrotSword:1096793344119685120>` : ''}
                    ${hasTACsWizardHatRole ? `**TAC's Wizard Hat** item <:TACsWizardHat:1096793805170147409>` : ''}

                    ${hasAdminRole ? '+ is an **Admin** of this server' : ''}
                    `,
                ephemeral: false,
            });
        } else {
            await interaction.reply({
                content:
                    `__**${member.user.tag}**'s Inventory__

                    Nooo! You don't have any Items.     :(

                    ${hasAdminRole ? 'but you are an **Admin** of this server, so you`re still cool B)' : ''}
                    `,
                ephemeral: false,
            });
        }
    }
});

client.login('token');
