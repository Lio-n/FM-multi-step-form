<script lang="ts">
	import type { PersonalInfo, RequestData } from '$lib/stores/form_state.store';
	import './shared.css';

	export let id: string;
	export let onSubmit: (e: PersonalInfo) => void;
	export const state: PersonalInfo = {
		name: '',
		email_address: '',
		phone_number: 0
	};

	const handleSubmit = (e: SubmitEvent) => {
		const formData = new FormData(e.target as HTMLFormElement) as Iterable<
			[PersonalInfo, FormDataEntryValue]
		>;
		const requestData: RequestData = Object.fromEntries(formData);

		const isValid: boolean = validate(requestData);

		console.log(`I'm personalInfoForm`, requestData);
		if (isValid) {
			onSubmit(requestData);
		}
	};

	const validate = (e: RequestData) => {
		return true;
	};
</script>

<form {id} on:submit|preventDefault={handleSubmit}>
	<label for="name">Name</label>
	<input id="name" name="name" bind:value={state.name} required />

	<label for="email_address">Email Address</label>
	<input
		id="email_address"
		name="email_address"
		bind:value={state.email_address}
		required
		type="email"
	/><br />

	<label for="phone_number">Phone Number</label>
	<input
		id="phone_number"
		name="phone_number"
		bind:value={state.phone_number}
		required
		type="number"
	/><br />
</form>

<style>
</style>
