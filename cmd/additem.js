module.exports = {
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

    execute(interaction) {
        const role = options.getRole('item');
        const member = options.getMember('member');
        const memberRoles = member.roles.cache.map(role => role.name);
        console.log(memberRoles);
        console.log(role.name);

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

            if(memberRoles.includes(role.name)) {
                console.log('include');
                interaction.reply({
                    content: `The member ${member.user.tag} already has the ${role.name} role.`,
                    ephemeral: true
                }); } else {
                    console.log('not include');
                    try {
                        member.roles.add(role);
                        interaction.reply(`Role ${role.name} assigned to ${member.user.tag}.`);
                    } catch (error) {
                        console.error(error);
                            interaction.reply({
                                content: 'There was an error while assigning the role.',
                                ephemeral: true
                            });
                    }
            }
      }
};


