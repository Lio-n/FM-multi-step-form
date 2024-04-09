<script lang="ts">
	import { form_state, type RequestData } from '$lib/stores/form_state.store';
	import Sidebar from '../components/sidebar.svelte';
	import FormStep1 from '../components/formSteps/step1.svelte';
	import FormStep2 from '../components/formSteps/step2.svelte';
	import NavegationControl from '../components/navegationControl.svelte';

	const formIDs: string[] = ['step_1', 'step_2'];
	const pages = [FormStep1, FormStep2];

	let currentStep: number = 0;
	let lengthSteps: number = pages.length;
	$: isValid = false;

	const onSubmit = (e: Partial<RequestData>) => {
		console.log(`I'm the onSubmit() function at Main-Page`);

		console.log(`🚀 ~ formDataObject:`, { ...$form_state, ...e });
		// Update the form data store
		form_state.set({ ...$form_state, ...e });

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

	const onChangeCurrentStep = (n: number) => (currentStep = n);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="FrontendMentor - Multi-step form challenge" />
</svelte:head>

<section>
	<Sidebar {currentStep} {onChangeCurrentStep} length={lengthSteps} />

	<svelte:component
		this={pages[currentStep]}
		{onSubmit}
		id={formIDs[currentStep]}
		state={$form_state}
	/>
	<!-- {#if currentStep === 0}
		<FormStep1 {onSubmit} id={formIDs[currentStep]} state={$form_state} />
	{:else if currentStep === 1}
		<FormStep2 {onSubmit} id={formIDs[currentStep]} state={$form_state} />
	{/if} -->

	<NavegationControl
		form={formIDs[currentStep]}
		length={lengthSteps}
		{currentStep}
		{handleNavigationControl}
	/>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
