<script lang="ts">
	export let currentStep: number;
	export let length: number;
	export let onChangeCurrentStep: (n: number) => void;
</script>

<aside class="sidebar">
	<ol class="sidebar__steps">
		<!-- eslint-disable-next-line -->
		{#each Array.from({ length }) as _, i}
			<li>
				<div>
					<button
						class="step {currentStep === i ? 'active' : ''}"
						type="button"
						on:click={() => onChangeCurrentStep(i)}>{i + 1}</button
					>
					<!-- <p>Text {i}</p> -->
				</div>
			</li>
		{/each}
	</ol>
</aside>

<style>
	.sidebar {
		display: flex;
		justify-content: center;
		background: url('../lib//images/bg-sidebar-mobile.svg') no-repeat center/cover;

		padding: 2rem 1rem;
		width: 100%;
		height: 15rem;
	}
	.sidebar__steps {
		display: flex;
		gap: 2rem;
		list-style-type: none;

		padding: 0;
	}
	.step {
		display: grid;
		place-items: center;
		width: 2.5rem;

		border-radius: 50%;
		color: var(--primary-200);
		aspect-ratio: 1;

		transition: all 0.2s ease-in-out;
		border: 1px solid;
		font-weight: 800;

		font-size: 1rem;
		background: transparent;
		cursor: pointer;
	}
	.step.active {
		background-color: var(--primary-200);
		color: var(--primary-800);
		border-color: var(--primary-200);
	}
</style>
