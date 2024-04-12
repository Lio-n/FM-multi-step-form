<script lang="ts">
	export let content: string[];
	export let currentStep: number;
	export let onChangeCurrentStep: (n: number) => void;
</script>

<aside class="sidebar">
	<ol class="sidebar__steps">
		{#each content as label, i}
			<li>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="step" role="button" tabindex="0" on:click={() => onChangeCurrentStep(i)}>
					<div class="step__circle {currentStep === i ? 'active' : ''}">{i + 1}</div>
					<div class="step__label">
						<p>STEP {i + 1}</p>
						<h3>{label}</h3>
					</div>
				</div>
			</li>
		{/each}
	</ol>
</aside>

<style>
	.sidebar {
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
		justify-content: center;
	}
	.step {
		cursor: pointer;
		width: fit-content;
	}

	.step__label {
		display: none;
	}

	.step__circle {
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
	.step__circle.active {
		background-color: var(--primary-200);
		color: var(--primary-800);
		border-color: var(--primary-200);
	}

	@media (min-width: 992px) {
		.sidebar {
			background: url('../lib//images/bg-sidebar-desktop.svg') no-repeat center/cover;
			height: inherit;
			width: inherit;

			border-radius: 1rem;
			padding: 2rem;
		}
		.step {
			display: flex;
			gap: 1rem;
			align-items: flex-start;
		}
		.step__label {
			display: flex;
			flex-direction: column;
		}
		.step__label p,
		h3 {
			margin: 0;
		}
		.step__label p {
			color: var(--neutral-300);
		}
		.step__label h3 {
			color: var(--white);
		}
		.sidebar__steps {
			flex-direction: column;
		}
	}
</style>
