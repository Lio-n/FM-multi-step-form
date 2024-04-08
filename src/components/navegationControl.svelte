<script lang="ts">
	export let form: string;
	export let handleNavigationControl: (nav: 'next' | 'prev') => void;
</script>

<div class="form__navigation-control">
	<button type="button" on:click={() => handleNavigationControl('prev')}>Prev</button>
	<button {form} on:click={() => handleNavigationControl('next')}>Next</button>
</div>

<style>
	.form__navigation-control button {
		border-radius: 2rem;
		padding: 0.5rem 2rem;
		background-color: rgb(68, 0, 255);
		color: #fff;
	}

	.form__navigation-control button:hover {
		background-color: rgb(68, 0, 255, 0.5);
	}
</style>
