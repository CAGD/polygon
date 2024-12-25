<template>
	<li class="cagd--list-item cagd--list-item--user">
		<Avatar :user="user" />
		<h3>{{ fullName }}</h3>
		<ListItemTools :tools="tools" />
	</li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Avatar from "./Avatar.vue";
import ListItemTools from "./ListItemTools.vue";

export default defineComponent({
	name: "UserListItem",
	props: {
		user: {
			type: Object,
			required: true,
		},
		tools: {
			type: Array,
			default: () => [], // Array of tool definitions
		},
	},
	computed: {
		fullName() {
			return `${this.user.firstName} ${this.user.lastName}`;
		},
	},
	components: {
		Avatar,
		ListItemTools,
	},
});
</script>
