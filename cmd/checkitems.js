module.exports = {
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

    execute(interaction) {
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
            interaction.reply({
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
            interaction.reply({
                content:
                    `__**${member.user.tag}**'s Inventory__

                    Nooo! You don't have any Items.     :(

                    ${hasAdminRole ? 'but you are an **Admin** of this server, so you`re still cool B)' : ''}
                    `,
                ephemeral: false,
            });
        }
    },
}
