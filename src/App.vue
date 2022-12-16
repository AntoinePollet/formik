<script lang="ts">
import { defineComponent } from 'vue';
import Formik from './components/Formik.vue';
import Field from './components/Field.vue';
import input from './components/input.vue';

export default defineComponent({
	components: { Formik, Field },
	setup() {
		const validate = (values: any) => {
			const errors = {};
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
         	return errors;
		}

		const submit = (values: Object, { setSubmitting, reset }) => {
			// AJAX call
			console.log('submit data: ', values)
			setSubmitting(false);
			reset();
		}

		return { validate, submit }
	}
})
</script>

<template>
	<div>
		<Formik :initialValues="{ email: '', password: '', checked: false, comment: '', select: '' }" :validate="validate" @submitData="submit">
			<template v-slot="{ state, handleSubmit }"> 
				<div class="flex flex-col gap-y-2">
					<div>
						<Field is="input"></Field>
					</div>
					<div>
						<Field name="email" type="text" placeholder="email"></Field>
					</div>
					<div>
						<Field name="password" type="password" placeholder="password"></Field>
					</div>
					<div>
						<Field name="checked" type="checkbox" as="checkbox"></Field>
					</div>
					<div>
						<Field name="comment" as="textarea"></Field>
					</div>
					<div>
						<Field name="select" as="select">
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
