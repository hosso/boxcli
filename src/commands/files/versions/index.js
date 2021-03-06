'use strict';

const BoxCommand = require('../../../box-command');

class FilesListVersionsCommand extends BoxCommand {
	async run() {
		const { flags, args } = this.parse(FilesListVersionsCommand);

		let versions = await this.client.files.getVersions(args.fileID);
		await this.output(versions);
	}
}

FilesListVersionsCommand.aliases = [ 'files:versions:list' ];

FilesListVersionsCommand.description = 'Get a list of file versions';

FilesListVersionsCommand.flags = {
	...BoxCommand.flags
};

FilesListVersionsCommand.args = [
	{
		name: 'fileID',
		required: true,
		hidden: false,
		description: 'ID of file to get versions for'
	}
];

module.exports = FilesListVersionsCommand;
