<script lang="ts">
	import type { RequestData } from '$lib/stores/form_state.store';
	import './shared.css';
	export let id: string;
	export let onSubmit: (e: Pick<RequestData, 'aboutMe'>) => void;
	export let state = {
		aboutMe: ''
	};

	const validate = (e: SubmitEvent) => {
		const formData = new FormData(e.target as HTMLFormElement) as Iterable<
			[Pick<RequestData, 'aboutMe'>, FormDataEntryValue]
		>;
		const requestData: RequestData = Object.fromEntries(formData);

		console.log(`I'm the validate() function for -> Step-2`, requestData);
		onSubmit(requestData);
	};
</script>

<form {id} on:submit|preventDefault={validate}>
	<label for="aboutMe">More about me</label>
	<textarea id="aboutMe" name="aboutMe" bind:value={state.aboutMe} /><br />
</form>

<style>
</style>
