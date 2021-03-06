'use strict';

const BoxCommand = require('../../box-command');

class CollaborationsDeleteCommand extends BoxCommand {
	async run() {
		const { flags, args } = this.parse(CollaborationsDeleteCommand);

		await this.client.collaborations.delete(args.id);
		this.info(`Collaboration ${args.id} successfully removed`);
	}
}

CollaborationsDeleteCommand.aliases = [
	'files:collaborations:delete',
	'folders:collaborations:delete'
];

CollaborationsDeleteCommand.description = 'Remove a collaboration';

CollaborationsDeleteCommand.flags = {
	...BoxCommand.flags
};

CollaborationsDeleteCommand.args = [
	{
		name: 'id',
		required: true,
		hidden: false,
		description: 'The ID of the collaboration to delete'
	}
];

module.exports = CollaborationsDeleteCommand;
