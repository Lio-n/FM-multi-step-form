<script lang="ts">
	import './shared.css';
	export let id: string;
	export let onSubmit: (e: FormData) => void;
	export let state = {
		firstName: '',
		lastName: ''
	};

	const handleSubmit = (e: SubmitEvent) => {
		const formData = new FormData(e.target as HTMLFormElement);

		console.log(`I'm the validate() function for -> Step-1`, formData);
		if (formData.get('firstName') === 'load') {
			onSubmit(formData);
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
