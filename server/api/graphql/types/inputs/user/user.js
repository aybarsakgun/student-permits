export const UserInput = `
	input UserInput {
		id: ID,
		username: String!,
		name: String!,
		lastName: String!,
		email: String!,
		phone: String!,
		role: UserRoleEnum!,
	}
`;

// role: UserRoleEnum!,
// 	classes: [ClassInput]