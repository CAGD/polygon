import Avatar from "../components/Avatar.vue";

export default {
	title: "Components/Avatar",
	component: Avatar,
};

const Template = (args) => ({
	components: { Avatar },
	setup() {
		return { args };
	},
	template: '<Avatar v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
	user: {
		avatar: "/path/to/default-avatar.png",
	},
};
