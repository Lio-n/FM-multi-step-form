<script lang="ts">
	import type { BillingPlan, RequestData } from '$lib/stores/form_state.store';
	import './shared.css';

	export let id: string;
	export let onSubmit: (e: BillingPlan) => void;
	export const state: BillingPlan = {
		category: 'Arcade',
		duration: 'Monthly'
	};

	const handleSubmit = (e: SubmitEvent) => {
		const formData = new FormData(e.target as HTMLFormElement) as Iterable<
			[BillingPlan, FormDataEntryValue]
		>;
		const requestData: RequestData = Object.fromEntries(formData);

		const isValid: boolean = validate(requestData);

		console.log(`I'm billingPlanForm`, requestData);
		if (isValid) {
			onSubmit(requestData); // this callback for main.
		}
	};

	const validate = (e: RequestData) => {
		return true;
	};
</script>

<form {id} on:submit|preventDefault={handleSubmit}></form>

<style>
</style>
