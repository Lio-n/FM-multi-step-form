<script lang="ts">
	import { form_state, type RequestData } from '$lib/stores/form_state.store';
	import Sidebar from '../components/sidebar.svelte';
	import NavegationControl from '../components/navegationControl.svelte';
	import PersonalInfoForm from '../components/forms/personalInfoForm.svelte';
	import BillingPlanForm from '../components/forms/billingPlanForm.svelte';
	import AddonsForm from '../components/forms/addons.svelte';
	import FinishingUp from '../components/forms/finishingUp.svelte';

	const formIDs: string[] = ['PersonalInfoForm', 'BillingPlanForm', 'AddonsForm', 'FinishingUp'];
	const pages = [PersonalInfoForm, BillingPlanForm, AddonsForm, FinishingUp];
	const sidebarContent = ['YOUR INFO', 'SELECT PLAN', 'ADD-ONS', 'SUMMARY'];

	let currentStep: number = 0;
	let lengthSteps: number = pages.length;
	$: isValid = false;

	const onSubmit = (e: Partial<RequestData>) => {
		// Update the form data store
		form_state.set({ ...$form_state, ...e });
		if (!$form_state.name && !$form_state.email_address && !$form_state.phone_number) {
			currentStep = 0;
			return;
		}

		console.log(`🚀 ~ I'm the onSubmit() function at Main-Page : `, { ...$form_state });

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

<div class="container">
	<Sidebar {currentStep} {onChangeCurrentStep} content={sidebarContent} />

	<div class="content">
		<div class="content__form">
			<svelte:component this={pages[currentStep]} {onSubmit} id={formIDs[currentStep]} />
		</div>

		<NavegationControl
			form={formIDs[currentStep]}
			length={lengthSteps}
			{currentStep}
			{handleNavigationControl}
		/>
	</div>
</div>

<style>
	.content {
		position: absolute;
		top: 7rem;
		right: 0;

		left: 0;
		max-width: 40rem;
		margin: 0 auto;

		width: 100%;
		overflow: hidden;
	}

	@media (min-width: 992px) {
		.container {
			display: grid;
			grid-template-columns: 20rem 40rem;
			grid-template-rows: 35rem;

			background-color: #fff;
			margin: 0 auto;
			border-radius: 1rem;

			padding: 1rem;
		}
		.content {
			position: relative;
			top: 0;
			padding: 1rem 0 1rem;
		}
		.content__form {
			overflow: auto;
		}
	}
</style>
