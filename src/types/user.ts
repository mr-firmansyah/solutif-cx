interface UserList extends Timestamps {
	userId: string;
	name: string;
	email: string;
	isActive: boolean | 0 | 1;
}
