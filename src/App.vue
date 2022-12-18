<script lang="ts">
import { defineComponent, ref } from 'vue';
import Formik from './components/Formik.vue';
import Field from './components/Field.vue';
import Input from './components/Input.vue';
import Captcha from './components/Captcha.vue';
import { State } from './interfaces/formikInterfaces';

export default defineComponent({
	components: { Formik, Field, Input, Captcha },
	setup() {
		const captcha = ref(null);

		const validate = (values: any) => {
			const errors: any = {};
        	if (!values.email) {
           		errors.email = 'Required';
         	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
           		errors.email = 'Invalid email address';
         	}

			if (!values.password) {
				errors.password = 'Required';
			} else if (values.password.length < 5) {
				errors.password = 'Password must be a least 5 characters';
			}

			if(Object.keys(values.captcha).length === 0) {
				errors.captcha = 'You have to select at least one picture';
			}
         	return errors;
		}

		const submit = (values: Object, { setSubmitting, reset }: { setSubmitting: Function, reset: Function }) => {
			// Do your stuff here
			console.log('submit data: ', values)
			setSubmitting(false);
			reset();
		}

		function onChange({ target: { name, value }}, state: State) {
				switch (name) {
					case "captcha":
					captcha.value = value;
					state.values['captcha' as keyof typeof state.values] = value;
					break;
				}
			}

		const options = [
			{
				id: 1,
				src: "https://picsum.photos/100?random=1",
			},
			{
				id: 2,
				src: "https://picsum.photos/100?random=2",
			},
			{
				id: 3,
				src: "https://picsum.photos/100?random=3",
			},
			{
				id: 4,
				src: "https://picsum.photos/100?random=4",
			},
			{
				id: 5,
				src: "https://picsum.photos/100?random=5",
			},
			{
				id: 6,
				src: "https://picsum.photos/100?random=6",
			},
			{
				id: 7,
				src: "https://picsum.photos/100?random=7",
			},
			{
				id: 8,
				src: "https://picsum.photos/100?random=8",
			},
			{
				id: 9,
				src: "https://picsum.photos/100?random=9",
			},
		];
		return { validate, submit, Input, Captcha, options, captcha, onChange }
	}
})
</script>

<template>
	<div>
		<Formik 
			:initialValues="{ hello: '', email: '', password: '', checked: false, comment: '', select: '', captcha: {} }" 
			:validate="validate" 
			@submitData="submit"
			class="pt-5"
		>
			<template v-slot="{ state, handleSubmit }"> 
				<div class="flex flex-col gap-y-2">
					<div>
						<Field :as="Captcha" name="captcha" :options="options" :value="captcha" @toto="onChange($event, state)"/>
					</div>
					<div>
						<Field :as="Input" name="hello" type="text" placeholder="custom input" />
					</div>
					<div>
						<Field name="email" type="text" placeholder="email" />
					</div>
					<div>
						<Field name="password" type="password" placeholder="password" />
					</div>
					<div>
						<Field name="checked" type="checkbox" />
					</div>
					<div>
						<Field name="comment" as="textarea" placeholder="Textarea" />
					</div>
					<div>
						<Field name="select" as="select" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option value="" selected disabled hidden>Select an option</option>
							<option>A</option>
							<option>B</option>
							<option>C</option>
						</Field>
					</div>
					<div>
						<button @click="handleSubmit">Submit</button>
					</div>
				</div>
			</template>
		</Formik>
	</div>
</template>
