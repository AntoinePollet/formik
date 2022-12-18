<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';

export default defineComponent({
    props: {
        name: {
            type: String as PropType<string>,
            default: ''
        },
        as: {
            type: [Object, String] as PropType<object | string>
        },
        type: {
            type: String as PropType<string>
        }
    },
	setup(props, { emit }) {
        const state: any = inject('state');
        const { name, as, type } = props;

        const inputEvent = (e: InputEvent): void => {
            const target = e.target as HTMLInputElement;
            if (target != null) {
                state.values[name] = target.value;
            }
        }

		return { emit, state, name, as, inputEvent }
	}
})
</script>

<template>
    <template v-if="as">
        <component 
            :is="as" 
            :value="state.values[name]" 
            @input="inputEvent" 
            :name="name" 
            :type="type ? type : null"
        >
            <slot></slot>
        </component>
    </template>

    <input v-else v-model="state.values[name]" :type="type" />
</template>
