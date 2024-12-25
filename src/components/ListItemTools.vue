<template>
	<ul class="list-item-tools">
		<li
			v-for="tool in tools"
			:key="tool.name"
			class="list-item-tool"
			@click="handleClick(tool)"
		>
			<button type="button">
				<img v-if="tool.icon" :src="tool.icon" :alt="tool.name" />
				<span v-else>{{ tool.label }}</span>
			</button>
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
	name: "ListItemTools",
	props: {
		tools: {
			type: Array as PropType<
				Array<{ name: string; label?: string; icon?: string; action: Function }>
			>,
			required: true,
		},
	},
	methods: {
		handleClick(tool: { name: string; action: Function }) {
			tool.action();
		},
	},
});
</script>
