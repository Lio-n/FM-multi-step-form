<script lang="ts">
	import './shared.css';
	export let id: string;
	export let onSubmit: (e: FormData) => void;
	export let state = {
		aboutMe: ''
	};

	type RequestData = {
		aboutMe: string;
	};

	const validate = (e: SubmitEvent) => {
		const formData = new FormData(e.target as HTMLFormElement) as unknown as Iterable<
			[RequestData, FormDataEntryValue]
		>;
		const requestData: RequestData = Object.fromEntries(formData);
		console.log(`🚀 ~ requestData:`, requestData);

		console.log(`I'm the validate() function for -> Step-2`, formData);
		onSubmit(formData as any);
	};
</script>

<form {id} on:submit|preventDefault={validate}>
	<label for="aboutMe">More about me</label>
	<textarea id="aboutMe" name="aboutMe" bind:value={state.aboutMe} /><br />
</form>

<style>
</style>
