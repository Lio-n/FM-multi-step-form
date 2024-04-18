<script lang="ts">
	import { form_state, type Addons, PLAN_DURATION } from '$lib/stores/form_state.store';
	import './shared.css';

	export let id: string;
	export let onSubmit: (e: Addons) => void;
	$: state = $form_state; // Access the state

	const addons: {
		id: keyof Addons;
		title: string;
		description: string;
		monthly_price: number;
		yearly_price: number;
	}[] = [
		{
			id: 'online_service',
			title: 'Online service',
			description: 'Access to multiplayer games',
			monthly_price: 90,
			yearly_price: 9
		},
		{
			id: 'large_storage',
			title: 'Larger storage',
			description: 'Extra 1TB cloud save',
			monthly_price: 120,
			yearly_price: 12
		},
		{
			id: 'customizable_profile',
			title: 'Customizable profile',
			description: 'Custom theme on your profile',
			monthly_price: 150,
			yearly_price: 15
		}
	];

	const handleSubmit = (e: SubmitEvent) => {
		const addonsElements: NodeListOf<HTMLInputElement & { id: keyof Addons }> = (
			e.target as HTMLFormElement
		).addon;

		let addonsSelected: Addons = {
			online_service: false,
			large_storage: false,
			customizable_profile: false
		};

		addonsElements.forEach((item) => (addonsSelected[item.id] = item.checked));

		onSubmit(addonsSelected);
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
					bind:checked={state[addon.id]}
				/>

				<div class="addon__details">
					<h4>{addon.title}</h4>
					<p>{addon.description}</p>
				</div>

				{#if state.duration === PLAN_DURATION[PLAN_DURATION.Monthly]}
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
