<template>
	<div class="avatar">
		<img :src="avatarSrc" :alt="altText" class="avatar-img" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Avatar",
	props: {
		user: {
			type: Object,
			required: true,
		},
		placeholder: {
			type: String,
			default: "/path/to/default-avatar.png", // Fallback image
		},
		altText: {
			type: String,
			default: "User Avatar",
		},
	},
	computed: {
		avatarSrc(): string {
			return this.user.avatar || this.placeholder;
		},
	},
});
</script>

<style scoped>
img.avatar-img {
	position: absolute;
	top: 0;
	left: 0;
	height: 2.5em;
	width: 2.5em;
}
</style>
