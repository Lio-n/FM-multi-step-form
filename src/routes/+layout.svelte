<script>
	import './styles.css';
</script>

<div>
	<main>
		<slot />
	</main>
</div>

<style>
	main {
		height: 100vh;
	}

	@media (min-width: 992px) {
		main {
			display: grid;
			align-items: center;
		}
	}
</style>
