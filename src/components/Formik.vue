<script lang="ts">
import { defineComponent, PropType, provide, reactive, ref } from 'vue';
import { State } from '../interfaces/formikInterfaces';
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

		const state = reactive<State>({
            values: initialValues,
            touched: {},
            errors: {}
        });
        
        provide('state', state);

        const handleSubmit = (): void => {
            isSubmitting.value = true;
            const errors = validate(state.values);
            if (Object.keys(errors).length > 0) {
                state.errors = errors;
                return;
            } else {
                emit('submitData', state.values, { setSubmitting, reset });
            }
		} 

        const setSubmitting = (value: boolean): void => {
            isSubmitting.value = value;
        }

        const reset = (): void => {
            for (let key of Object.keys(state.values)) {
                if (typeof state.values[key as keyof typeof state.values] === 'string') {
                    state.values[key] = '';
                } else if (typeof state.values[key as keyof typeof state.values] === 'boolean') {
                    state.values[key]  = false;
                }
            }
            state.errors = {};
        }

        return { state, emit, handleSubmit, isSubmitting }
	}
})
</script>

<template>
	<form @submit.native.prevent="handleSubmit()">
        <div class="flex">
            <div class="w-1/2 flex justify-center">
                <pre>
                    {{ state }}
                </pre>
            </div>
            <div>
                <slot :state="state"></slot>
            </div>
        </div>
    </form>
</template>
