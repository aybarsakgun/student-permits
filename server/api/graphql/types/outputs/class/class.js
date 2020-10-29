export const ClassType = `
	type Class {
		id: ID!
		name: String!
		school: School!
		teachers: [User]
		students: [User]
		createdAt: String!
		updatedAt: String!
	}
`;
