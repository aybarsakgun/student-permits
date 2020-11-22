export const NavigationItemType = `
	type NavigationItem {
		id: String!
		title: String!
		type: NavigationItemTypeEnum!
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
		children: [NavigationItem]
	}
`;
