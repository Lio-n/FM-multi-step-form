<script lang="ts">
	import { form_state, PLAN_DURATION, type Addon, ADDONS_TYPE } from '$lib/stores/form_state.store';
	import './shared.css';

	export let id: string;
	export let onSubmit: (e: { Addons: Addon[] }) => void;
	$: state = $form_state; // Access the state

	const addons: {
		id: Partial<keyof typeof ADDONS_TYPE>;
		title: string;
		description: string;
		monthly_price: number;
		yearly_price: number;
	}[] = [
		{
			id: ADDONS_TYPE[ADDONS_TYPE.online_service] as keyof typeof ADDONS_TYPE,
			title: 'Online service',
			description: 'Access to multiplayer games',
			monthly_price: 1,
			yearly_price: 10
		},
		{
			id: ADDONS_TYPE[ADDONS_TYPE.large_storage] as keyof typeof ADDONS_TYPE,
			title: 'Larger storage',
			description: 'Extra 1TB cloud save',
			monthly_price: 2,
			yearly_price: 20
		},
		{
			id: ADDONS_TYPE[ADDONS_TYPE.customizable_profile] as keyof typeof ADDONS_TYPE,
			title: 'Customizable profile',
			description: 'Custom theme on your profile',
			monthly_price: 2,
			yearly_price: 20
		}
	];

	const handleSubmit = (e: SubmitEvent) => {
		const addonsElements: NodeListOf<HTMLInputElement & { id: Partial<keyof typeof ADDONS_TYPE> }> =
			(e.target as HTMLFormElement).addon;

		let addonsSelected: Addon[] = [];

		// The order of the elements is corresponding to their rendering order.
		addonsElements.forEach((item, i) => {
			if (item.checked)
				addonsSelected.push({
					type: addons[i].id,
					title: addons[i].title,
					monthly_price: addons[i].monthly_price,
					yearly_price: addons[i].yearly_price
				});
		});

		onSubmit({ Addons: addonsSelected });
	};

	const changeCheckedVisual = (e: Event) => {
		const cardElement = e.target as HTMLElement;
		const inputElement = cardElement.querySelector('.addon__input--checkbox') as HTMLInputElement;

		if (cardElement.classList.contains('addon--active')) {
			cardElement.classList.remove('addon--active');
			inputElement.checked = false;
		} else {
			cardElement.classList.add('addon--active');
			inputElement.checked = true;
		}
	};
</script>

<form {id} on:submit|preventDefault={handleSubmit}>
	<div class="header">
		<h2>Pick add-ons</h2>
		<p>Add-ons help to enhance your gaming experience.</p>
	</div>

	<div class="addons">
		{#each addons as addon}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="addon" on:click={changeCheckedVisual} class:addon--active={false}>
				<input
					class="addon__input--checkbox"
					type="checkbox"
					id={addon.id}
					name="addon"
					checked={!!state.Addons.find((i) => i.type === addon.id)}
				/>

				<div class="addon__details">
					<h4>{addon.title}</h4>
					<p>{addon.description}</p>
				</div>

				{#if state.BillingPlan.duration === PLAN_DURATION[PLAN_DURATION.Monthly]}
					<p class="addon__price">+${addon.monthly_price}/mo</p>
				{:else}
					<p class="addon__price">+${addon.yearly_price}/yr</p>
				{/if}
			</div>
		{/each}
	</div>
</form>

<style>
	.addons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.addon {
		display: flex;
		align-items: center;
		gap: 2rem;

		padding: 1.5rem;
		border: 1px solid var(--neutral-300);
		border-radius: 0.5rem;

		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.addon:hover,
	.addon:focus {
		border-color: var(--primary-400);
	}

	.addon__input--checkbox {
		accent-color: var(--primary-400);
		width: 1.2rem;
		aspect-ratio: 1;

		cursor: pointer;
		pointer-events: none;
		flex-shrink: 0;
	}
	.addon--active {
		background-color: var(--neutral-200);
		border-color: var(--primary-400);
	}
	.addon__details {
		pointer-events: none;
	}
	.addon__details h4 {
		color: var(--primary-800);
		margin-bottom: 0.25em;
	}
	.addon__details p {
		font-weight: 400;
		color: var(--neutral-400);
		line-height: 1.5em;
	}

	.addon__price {
		margin-left: auto;
		font-weight: 500;
		color: var(--primary-400);
	}
</style>
