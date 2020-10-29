export const UserType = `
	type User {
		id: ID!
		name: String!
		lastName: String!
		email: String!
		phone: String!
		role: UserRoleEnum!
		school: School
		createdAt: String!
		updatedAt: String!
	}
`;
