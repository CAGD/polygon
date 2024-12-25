import UserListItem from "../components/UserListItem.vue";

export default {
	title: "Components/UserListItem", // Organises in Storybook UI
	component: UserListItem,
};

const Template = (args) => ({
	components: { UserListItem },
	setup() {
		return { args };
	},
	template: '<UserListItem v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
	user: {
		firstName: "Kisa",
		lastName: "Naumova",
		avatar: "http://avatar0.cagd.co.uk/avatar/naumov01.jpg",
	},
	tools: [
		{
			name: "edit",
			label: "Edit",
			icon: "/icons/edit.svg",
			action: () => console.log("Edit"),
		},
		{
			name: "delete",
			label: "Delete",
			icon: "/icons/delete.svg",
			action: () => console.log("Delete"),
		},
	],
};
