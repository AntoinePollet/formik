<script lang="ts">
import { defineComponent, inject, Prop, PropType, ref, toRefs } from 'vue';

export default defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
            default: ''
        },
        as: {
            type: String as PropType<string>
        }
    },
	setup(props, { emit }) {
        const state: any = inject('state');
        const { name, as } = props;

		return { emit, state, name, as }
	}
})
</script>

<template>
    <input v-if="(as === 'checkbox')" v-model="state.values[name]" type="checkbox" />

    <input v-else-if="(as === 'radio')" v-model="state.values[name]" type="radio" />

    <template v-else-if="(as === 'select')">
        <select v-model="state.values[name]">
            <option disabled value="">Please select one</option>
            <slot></slot>
        </select>
    </template>

    <template v-else-if="(as === 'textarea')">
        <textarea v-model="state.values[name]"></textarea>
    </template>    

    <input v-else v-model="state.values[name]" class="border-slate-200 placeholder-slate-400" />
</template>
