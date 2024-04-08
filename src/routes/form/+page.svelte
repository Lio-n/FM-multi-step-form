<script lang="ts">
	import { form_state } from '$lib/stores/form_state.store';
	import FormStep1 from '../../components/formSteps/step1.svelte';
	import FormStep2 from '../../components/formSteps/step2.svelte';

	const formIDs: string[] = ['step_1', 'step_2'];
	const pages = [FormStep1, FormStep2];

	let currentStep: number = 0;
	let lengthSteps: number = pages.length;
	$: isValid = false;

	const onSubmit = (e: FormData) => {
		console.log(`I'm the onSubmit() function at Main-Page`);

		const formDataObject = {} as any;
		e.forEach((value, key) => {
			formDataObject[key] = value;
		});

		// Update the form data store
		form_state.update(formDataObject);

		isValid = true;
		handleNavigationControl('next');
	};

	const handleNavigationControl = (nav: 'next' | 'prev') => {
		if (isValid && nav === 'next' && currentStep < lengthSteps - 1) {
			currentStep++;
			isValid = false;
		}
		if (nav === 'prev' && currentStep > 0) {
			currentStep--;
		}
	};
</script>

<svelte:head>
	<title>Form</title>
	<meta name="description" content="Multi step form" />
</svelte:head>

{#if currentStep === 0}
	<FormStep1 {onSubmit} id={formIDs[currentStep]} state={$form_state} />
{:else if currentStep === 1}
	<FormStep2 {onSubmit} id={formIDs[currentStep]} state={$form_state} />
{/if}

<div class="form__navigation-control">
	{#if currentStep === lengthSteps - 1}
		<button type="button" on:click={() => handleNavigationControl('prev')}>Prev</button>
	{/if}
	<button form={formIDs[currentStep]} on:click={() => handleNavigationControl('next')}
		>{currentStep === lengthSteps - 1 ? 'Submit' : 'Next'}</button
	>
</div>

<style>
	/* const steps: string[] = ['Step 1', 'Step 2', 'Step 3'];
	let currentStep: number = 0;
	let formData = {
		step1Field: '',
		step2Field: '',
		step3Field: ''
	};
	let stepValid = false;

	// Validation functions for each step
	const validateStep1 = (data: any) => {
		// Add your validation logic for Step 1 here
		return data.step1Field !== '';
	};

	const validateStep2 = (data: any) => {
		// Add your validation logic for Step 2 here
		return data.step2Field !== '';
	};

	const validateStep3 = (data: any) => {
		// Add your validation logic for Step 3 here
		return data.step3Field !== '';
	};

	// Function to handle navigation and validation
	const handleNavigationControl = (nav: 'next' | 'prev', formData: any) => {
		console.log(`🚀 ~ formData:`, formData);
		let isValid = false;
		const validateSteps = [validateStep1, validateStep2, validateStep3];
		// isValid = validateSteps[currentStep](formData);

		switch (currentStep) {
			case 0:
				isValid = validateStep1(formData);
				break;
			case 1:
				isValid = validateStep2(formData);
				break;
			case 2:
				isValid = validateStep3(formData);
				break;
			default:
				isValid = false;
		}
		if (isValid && nav === 'next' && currentStep < steps.length - 1) {
			currentStep++;
		}
		if (nav === 'prev' && currentStep > 0) {
			currentStep--;
		}
	}; */
</style>
