<script lang="ts">
	import { PLAN_DURATION, form_state, type RequestData } from '$lib/stores/form_state.store';
	import './shared.css';

	export let id: string;
	export let onSubmit: (e: Partial<RequestData>) => void;

	export let navegateToForm: (step: number) => void;
	$: state = $form_state; // Access the state

	$: total_price = 0;

	$: {
		let isMonthly = state.BillingPlan.duration === PLAN_DURATION[PLAN_DURATION.Monthly];

		let plan_price = isMonthly ? state.BillingPlan.monthly_price : state.BillingPlan.yearly_price;

		let acc: number = 0;

		state?.Addons.forEach((item) => (acc = isMonthly ? item.monthly_price : item.yearly_price));

		total_price = plan_price + acc;
	}

	const handleSubmit = () => onSubmit({ ...state });
</script>

<form {id} on:submit|preventDefault={handleSubmit}>
	<div class="header">
		<h2>Finishing up</h2>
		<p>Double-check everything looks OK before confirming.</p>
	</div>

	<div class="summary__addons">
		<div class="addons__billing-plan">
			<div class="billing-plan__head">
				<h3>{state.BillingPlan.category} ({state.BillingPlan.duration})</h3>
				<button on:click={() => navegateToForm(1)}>Change</button>
			</div>

			{#if state.BillingPlan.duration === PLAN_DURATION[PLAN_DURATION.Monthly]}
				<p class="summary__price">${state.BillingPlan.monthly_price}/mo</p>
			{:else}
				<p class="summary__price">${state.BillingPlan.yearly_price}/yr</p>
			{/if}
		</div>

		{#each state.Addons as addon}
			<div class="billing-plan__item">
				<p>{addon.title}</p>

				{#if state.BillingPlan.duration === PLAN_DURATION[PLAN_DURATION.Monthly]}
					<p class="summary__price">${addon.monthly_price}/mo</p>
				{:else}
					<p class="summary__price">${addon.yearly_price}/yr</p>
				{/if}
			</div>
		{/each}
	</div>

	<div class="summary__total">
		<p>Total (per year)</p>
		{#if state.BillingPlan.duration === PLAN_DURATION[PLAN_DURATION.Monthly]}
			<p class="summary__price">${total_price}/mo</p>
		{:else}
			<p class="summary__price">${total_price}/yr</p>
		{/if}
	</div>
</form>

<style>
	.summary__addons {
		background-color: var(--neutral-200);
		padding: 2rem 1rem;
		border-radius: 0.5rem;

		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}
	.addons__billing-plan,
	.billing-plan__item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.addons__billing-plan {
		border-bottom: 1px solid var(--neutral-300);
		padding-bottom: 2rem;
	}

	.addons__billing-plan h3 {
		text-transform: capitalize;
		font-weight: 500;
		font-size: 1.2rem;

		color: var(--primary-800);
		margin-bottom: 0.25em;
	}
	.addons__billing-plan button {
		padding: 0;
		font-weight: 400;
		text-decoration: underline;

		border: none;
		border-radius: 0.5rem;
		font-family: inherit;

		font-size: 1rem;
		cursor: pointer;
		background: none;

		color: var(--neutral-400);
		transition: filter 0.2s ease-in-out;
	}

	.summary__price {
		font-weight: 800;
		font-size: 1.1rem;
		color: var(--primary-800);

		font-weight: 500;
	}

	.summary__total {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 2rem;
	}
	.summary__total .summary__price {
		color: var(--primary-400);
		font-size: 1.3rem;
	}
</style>
