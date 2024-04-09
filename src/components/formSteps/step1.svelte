<script lang="ts">
	import type { RequestData } from '$lib/stores/form_state.store';
	import './shared.css';
	export let id: string;
	export let onSubmit: (e: Pick<RequestData, 'firstName' | 'lastName'>) => void;
	export let state = {
		firstName: '',
		lastName: ''
	};

	const handleSubmit = (e: SubmitEvent) => {
		const formData = new FormData(e.target as HTMLFormElement) as Iterable<
			[Pick<RequestData, 'firstName' | 'lastName'>, FormDataEntryValue]
		>;
		const requestData: RequestData = Object.fromEntries(formData);

		console.log(`I'm the validate() function for -> Step-1`, requestData);
		if (requestData.firstName === 'load') {
			onSubmit(requestData);
		}
	};
</script>

<form {id} on:submit|preventDefault={handleSubmit}>
	<label for="firstName">First name</label>
	<input id="firstName" name="firstName" bind:value={state.firstName} required />
	<label for="lastName">Last name</label>
	<input id="lastName" name="lastName" bind:value={state.lastName} required /><br />
</form>

<style>
</style>
