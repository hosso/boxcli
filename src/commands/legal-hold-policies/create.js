'use strict';

const BoxCommand = require('../../box-command');
const { flags } = require('@oclif/command');

class LegalHoldPoliciesCreateCommand extends BoxCommand {
	async run() {
		const { flags, args } = this.parse(LegalHoldPoliciesCreateCommand);
		let options = {};

		if (flags.description) {
			options.description = flags.description;
		}
		if (flags['filter-started-at']) {
			options.filter_started_at = this.getDateFromString(flags['filter-started-at']);
		}
		if (flags['filter-ended-at']) {
			options.filter_ended_at = this.getDateFromString(flags['filter-ended-at']);
		}
		if (flags.hasOwnProperty('ongoing')) {
			options.is_ongoing = true;
		}

		let policy = await this.client.legalHoldPolicies.create(args.policyName, options);
		await this.output(policy);
	}
}

LegalHoldPoliciesCreateCommand.description = 'Create a new legal hold policy';

LegalHoldPoliciesCreateCommand.flags = {
	...BoxCommand.flags,
	description: flags.string({ description: 'Description of legal hold policy' }),
	'filter-started-at': flags.string({
		description: 'Date filter applies to Custodian assignments only. Should be today\'s date or before. Use a RFC3339 timestamp or shorthand syntax 0t, like -5w for 5 weeks ago',
		dependsOn: ['filter-ended-at'],
		exclusive: ['is-ongoing']
	}),
	'filter-ended-at': flags.string({
		description: 'Date filter applies to Custodian assignments only. Should be today\'s date or before. Use a RFC3339 timestamp or shorthand syntax 0t, like -5w for 5 weeks ago',
		dependsOn: ['filter-started-at'],
		exclusive: ['is-ongoing']
	}),
	ongoing: flags.boolean({
		description: 'Assignments under this policy will continue applying to files based on events, indefinitely',
		exclusive: [
			'filter-started-at',
			'filter-ended-at'
		],
	})
};

LegalHoldPoliciesCreateCommand.args = [
	{
		name: 'policyName',
		required: true,
		hidden: false,
		description: 'Name of the legal hold policy',
	}
];

module.exports = LegalHoldPoliciesCreateCommand;
