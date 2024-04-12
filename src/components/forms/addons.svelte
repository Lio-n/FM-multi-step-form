<script lang="ts">
	import type { Addons, RequestData } from '$lib/stores/form_state.store';
	import './shared.css';

	export let id: string;
	export let onSubmit: (e: Addons) => void;
	export const state: Addons = {
		online_service: false,
		large_storage: false,
		customizable_profile: false
	};

	const handleSubmit = (e: SubmitEvent) => {
		const formData = new FormData(e.target as HTMLFormElement) as Iterable<
			[Addons, FormDataEntryValue]
		>;
		const requestData: RequestData = Object.fromEntries(formData);

		const isValid: boolean = validate(requestData);

		console.log(`I'm AddonsForm`, requestData);
		if (isValid) {
			onSubmit(requestData);
		}
	};

	const validate = (e: RequestData) => {
		console.log(`🚀 ~ e:`, e);
		return true;
	};
</script>

<form {id} on:submit|preventDefault={handleSubmit}></form>

<style>
</style>
