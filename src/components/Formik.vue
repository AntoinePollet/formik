<script lang="ts">
import { defineComponent, PropType, provide, reactive, toRefs, ref } from 'vue';

export default defineComponent({
    props: {
        initialValues: {
            type: Object as PropType<Object>,
            default: {}
        },
        validate: {
            type: Function as PropType<Function>,
            default: () => {}
        }
    },
	setup(props, { emit }) {
        const { initialValues, validate } = props;

        const isSubmitting = ref<boolean>(false);

		const state = reactive<any>({
            values: initialValues,
            touched: {},
            errors: {}
        });
        
        provide('state', state);

        const handleSubmit = () => {
            isSubmitting.value = true;
            const errors = validate(state.values);
            if (Object.keys(errors).length > 0) {
                state.errors = errors;
                return;
            } else {
                emit('submitData', state.values, { setSubmitting, reset });
            }
		} 

        const setSubmitting = (value: boolean) => {
            isSubmitting.value = value;
        }

        const reset = () => {
            // WIP reset state values
            state.values.forEach((field: any) => {
                if (typeof state.values[field] === 'string') {
                    field = '';
                } else if (typeof state.values[field] === 'boolean') {
                    field = false;
                }
            })

            state.errors = {};
        }

        return { state, emit, handleSubmit, isSubmitting }
	}
})
</script>

<template>
	<form @submit.native.prevent="handleSubmit()">
        {{ state }}
        <slot :state="state"></slot>
    </form>
</template>
