<script>
	import ThankYouIcon from '../lib/images/icon-thank-you.svg';
</script>

<div class="cartel">
	<div class="cartel__card">
		<img class="card__icon" src={ThankYouIcon} alt="thank-you" aria-hidden="true" />
		<h2>Thank you!</h2>
		<p>
			Thanks for confirming your subscription! We hope you have fun using our platform. If you ever
			need support, please feel free to email us at support@loremgaming.com.
		</p>
	</div>
</div>

<style>
	.cartel {
		margin: 0 1rem;
		padding: 2rem 1rem;
		overflow: auto;

		background-color: var(--white);
		border-radius: 1rem;
		box-shadow: 10px 10px 25px -10px #0000001a;
	}

	@media (min-width: 992px) {
		.cartel {
			padding-top: 3rem;
			box-shadow: none;
		}
	}

	.cartel__card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.card__icon {
		margin-bottom: 2rem;
	}

	.cartel__card h2 {
		font-size: 2rem;
		margin-bottom: 0.25em;
	}
</style>
