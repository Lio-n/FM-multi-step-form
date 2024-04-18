<script lang="ts">
	import {
		PLAN_CATEGORY,
		type BillingPlan,
		PLAN_DURATION,
		form_state
	} from '$lib/stores/form_state.store';
	import './shared.css';
	import ArcadeIcon from '../../lib/images/icon-arcade.svg';
	import AdvancedIcon from '../../lib/images/icon-advanced.svg';
	import ProIcon from '../../lib/images/icon-pro.svg';

	export let id: string;
	export let onSubmit: (e: { BillingPlan: BillingPlan }) => void;
	$: state = $form_state; // Access the state

	const plans: {
		title: Partial<keyof typeof PLAN_CATEGORY>;
		monthly_price: number;
		yearly_price: number;
		icon: string;
	}[] = [
		{
			title: PLAN_CATEGORY[PLAN_CATEGORY.Arcade] as keyof typeof PLAN_CATEGORY,
			monthly_price: 90,
			yearly_price: 9,
			icon: ArcadeIcon
		},
		{
			title: PLAN_CATEGORY[PLAN_CATEGORY.Advanced] as keyof typeof PLAN_CATEGORY,
			monthly_price: 120,
			yearly_price: 12,
			icon: AdvancedIcon
		},
		{
			title: PLAN_CATEGORY[PLAN_CATEGORY.Pro] as keyof typeof PLAN_CATEGORY,
			monthly_price: 150,
			yearly_price: 15,
			icon: ProIcon
		}
	];

	const handleSubmit = (e: SubmitEvent) => {
		const plansElements: NodeListOf<
			HTMLInputElement & { id: Partial<keyof typeof PLAN_CATEGORY> }
		> = (e.target as HTMLFormElement).plan;

		let billingSelected: BillingPlan = {
			category: 'Arcade',
			duration: 'Monthly',
			monthly_price: plans[0].monthly_price,
			yearly_price: plans[0].yearly_price
		};

		// The order of the elements is corresponding to their rendering order.
		plansElements.forEach((item, i) => {
			if (item.checked)
				billingSelected = {
					category: item.id,
					duration: state.BillingPlan.duration,
					monthly_price: plans[i].monthly_price,
					yearly_price: plans[i].yearly_price
				};
		});

		onSubmit({ BillingPlan: billingSelected });
	};

	const handleBillingPlan = (e: Event) => {
		const isMonthly: boolean = (e.target as HTMLFormElement).checked;
		const plansElems = document.querySelector('.billing__toggle')?.querySelectorAll('h5');

		if (!plansElems) return;

		plansElems?.forEach((h5) => h5.classList.remove('active'));

		state.BillingPlan.duration = !isMonthly
			? (PLAN_DURATION[PLAN_DURATION.Monthly] as keyof typeof PLAN_DURATION)
			: (PLAN_DURATION[PLAN_DURATION.Yearly] as keyof typeof PLAN_DURATION);

		!isMonthly ? plansElems[0].classList.add('active') : plansElems[1].classList.add('active');
	};
</script>

<form {id} on:submit|preventDefault={handleSubmit}>
	<div class="header">
		<h2>Select your plan</h2>
		<p>You have the option of monthly or yearly billing.</p>
	</div>

	<div class="plans">
		{#each plans as plan}
			<div class="plan">
				<input
					class="plan__input--radio"
					type="radio"
					id={plan.title}
					name="plan"
					checked={state.BillingPlan.category === plan.title}
				/>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<label class="plan__details" for={plan.title} tabindex="0"
					><img class="details__icon" src={plan.icon} alt="arcade" />
					<div class="details__content">
						<h4>{plan.title}</h4>
						{#if state.BillingPlan.duration === PLAN_DURATION[PLAN_DURATION.Yearly]}
							<p>${plan.yearly_price}/yr</p>
							<p>2 months free</p>
						{:else}
							<p>${plan.monthly_price}/mo</p>
						{/if}
					</div></label
				>
			</div>
		{/each}
	</div>

	<div class="billing">
		<div class="billing__toggle">
			<h5 class:active={state.BillingPlan.duration === PLAN_DURATION[PLAN_DURATION.Monthly]}>
				Monthly
			</h5>
			<input
				class="toggle__input--checkbox"
				type="checkbox"
				id="billing"
				on:change={handleBillingPlan}
				checked={state.BillingPlan.duration === PLAN_DURATION[PLAN_DURATION.Yearly]}
			/>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<label for="billing" tabindex="0"></label>
			<h5 class:active={state.BillingPlan.duration === PLAN_DURATION[PLAN_DURATION.Yearly]}>
				Yearly
			</h5>
		</div>
	</div>
</form>

<style>
	h5 {
		color: var(--primary-800);
		margin: 0 0.25em 0;
	}

	.plans {
		display: grid;
		gap: 1rem;

		margin-bottom: 2rem;
	}

	.details__content > * {
		margin: 0;
	}

	.plan__input--radio,
	.toggle__input--checkbox {
		display: none;
	}

	.plan__details {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem;

		border-radius: 0.5rem;
		border: 1px solid var(--neutral-300);
		cursor: pointer;

		transition: all 0.2s ease-in-out;
	}

	.plan__input--radio:checked ~ .plan__details {
		background-color: var(--neutral-200);
		border-color: var(--primary-400);
	}

	.details__icon {
		width: 40px;
		height: 40px;
		object-fit: cover;
	}

	.details__content h4 {
		color: var(--primary-800);
		margin-bottom: 0.25em;
	}

	.details__content p:nth-child(3) {
		color: var(--primary-800);
		font-weight: 500;
	}

	.details__content p {
		font-weight: 400;
		color: var(--neutral-400);
		line-height: 1.5em;
	}

	.billing {
		display: flex;
		justify-content: center;
		border-radius: 0.5rem;

		padding: 1rem;
		background-color: var(--neutral-200);
	}

	.billing__toggle {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.toggle__input--checkbox + label {
		display: block;
		position: relative;
		border-radius: 100vmax;

		--padding: 0.25em;
		--width: 3rem;
		width: var(--width);

		aspect-ratio: 2;
		background-color: var(--primary-800);
		cursor: pointer;
	}

	.toggle__input--checkbox + label::after {
		content: '';
		position: absolute;
		background-color: var(--white);

		top: var(--padding);
		bottom: var(--padding);
		left: var(--padding);

		aspect-ratio: 1;
		border-radius: 50%;
		transition: all 0.3s ease-in-out;
	}

	.toggle__input--checkbox:checked + label::after {
		translate: calc(var(--width) - 100% - var(--padding) * 2);
	}

	.billing__toggle h5:not(.active) {
		color: var(--neutral-400);
	}

	@media (min-width: 992px) {
		.plans {
			grid-template-columns: repeat(3, 1fr);
		}
		.plan__details {
			flex-direction: column;
		}
		.details__icon {
			margin-bottom: 4rem;
		}
	}
</style>
