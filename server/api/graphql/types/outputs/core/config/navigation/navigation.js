export const NavigationType = `
	type Navigation {
		id: String!
		title: String!
		type: NavigationTypeEnum!
		translate: String
		icon: String,
		hidden: Boolean
		url: String
		classes: String
		exactMatch: Boolean
		external: Boolean
		target: Boolean
		breadcrumbs: Boolean
		function: String
		badge: Badge
		children: [Navigation]
	}
`;
