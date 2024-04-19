<script lang="ts">
	export let form: string;
	export let currentStep: number;
	export let length: number;
	export let handleNavigationControl: (nav: 'next' | 'prev') => void;
</script>

<div class="form__navigation-control">
	{#if currentStep > 0 && currentStep < length}
		<button type="button" on:click={() => handleNavigationControl('prev')} class="control__prev"
			>Go Back</button
		>
	{/if}
	<button class="control__next" {form} on:click={() => handleNavigationControl('next')}
		>{currentStep === length - 1 ? 'Submit' : 'Next'}</button
	>
</div>

<style>
	.form__navigation-control {
		background-color: var(--white);
		border-radius: 1rem;
		padding: 1rem;

		margin: 2rem 1rem 0;
		display: flex;
		justify-content: space-between;

		height: fit-content;
	}
	.control__prev,
	.control__next {
		color: var(--white);
		border: none;
		height: fit-content;

		padding: 1rem 1.5rem;
		border-radius: 0.5rem;
		font-weight: 500;

		font-family: inherit;
		font-size: 1rem;
		cursor: pointer;

		background: none;
	}

	.control__prev {
		color: var(--neutral-400);
	}
	.control__prev:hover {
		color: var(--primary-800);
		filter: brightness(1.5);
	}
	.control__next {
		background-color: var(--primary-800);
		margin-left: auto;
	}
	.control__next:hover {
		filter: brightness(1.5);
	}
</style>
