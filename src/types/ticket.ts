interface TicketList extends Timestamps {
	assigneeData: string;
	ticketId: string;
	ticketCode: string;
	subject: string;
	description: string;
	priority: string;
	status: number;
	targetResolutionDate: string;
	company: {
		companyId: string;
		name: string;
	};
	project: {
		projectId: string;
		name: string;
	};
	contact: {
		id: string;
		name: string;
	};
	category: {
		categoryId: string;
		name: string;
	};
}
