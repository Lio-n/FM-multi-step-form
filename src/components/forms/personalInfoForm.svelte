<script lang="ts">
	import { form_state, type PersonalInfo } from '$lib/stores/form_state.store';
	import { validatePhoneNumber } from '../../validations/phone_number.validate';
	import './shared.css';

	export let id: string;
	export let onSubmit: (e: { PersonalInfo: PersonalInfo }) => void;

	$: state = $form_state;

	let error = {
		name: false,
		email_address: false,
		phone_number: false
	};

	const handleSubmit = (e: SubmitEvent) => {
		const formData = new FormData(e.target as HTMLFormElement) as Iterable<
			[PersonalInfo, FormDataEntryValue]
		>;
		const requestData: PersonalInfo = Object.fromEntries(formData);

		const isValid = validate(requestData);

		if (isValid) onSubmit({ PersonalInfo: requestData });
	};

	const validate = (e: PersonalInfo) => {
		error = {
			name: !e.name,
			phone_number: !validatePhoneNumber(e.phone_number as string),
			email_address: !e.email_address
		};

		if (!error.email_address && !error.name && !error.phone_number) return true;

		return false;
	};
</script>

<form {id} on:submit|preventDefault={handleSubmit}>
	<div class="header">
		<h2>Personal info</h2>
		<p>Please provide your name, email, address, and phone number.</p>
	</div>

	<div class="input__group">
		<label class="group__label" for="name">Name</label>
		<input
			id="name"
			name="name"
			bind:value={state.PersonalInfo.name}
			placeholder="e.g. Stephen King"
			class="group__input"
			class:group__input--error={error.name}
		/>
		{#if error.name}
			<div class="group__error">This field is Required</div>
		{/if}
	</div>

	<div class="input__group">
		<label class="group__label" for="email_address">Email Address</label>
		<input
			id="email_address"
			name="email_address"
			bind:value={state.PersonalInfo.email_address}
			placeholder="e.g. Stephenking@lorem.com"
			type="email"
			class="group__input"
			class:group__input--error={error.email_address}
		/>
		{#if error.email_address}
			<div class="group__error">This field is Required</div>
		{/if}
	</div>

	<div class="input__group">
		<label class="group__label" for="phone_number">Phone Number</label>
		<input
			id="phone_number"
			name="phone_number"
			bind:value={state.PersonalInfo.phone_number}
			placeholder="e.g. +1 234 567 890"
			class="group__input"
			class:group__input--error={error.phone_number}
		/>
		{#if error.phone_number}
			<div class="group__error">This field is Required</div>
		{/if}
	</div>
</form>

<style>
	.input__group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		margin-bottom: 1.5rem;
		font-weight: 500;
		color: var(--primary-800);

		position: relative;
	}

	.group__input--error {
		border-color: #d82020 !important;
	}
	.group__error {
		position: absolute;
		font-weight: 500;
		right: 0;
		font-size: 0.8rem;
		color: #d82020;
		margin-left: 0.25rem;
	}

	.group__label {
		margin-left: 0.25rem;
	}

	.group__input {
		padding: 0.75rem;
		font-size: 1rem;
		border: 1px solid var(--neutral-300);

		border-radius: 0.5rem;
		background-color: var(--neutral-100);
		outline: none;
	}

	.group__input:focus {
		border-color: var(--primary-400);
	}

	.group__input::placeholder {
		color: var(--neutral-400);
	}
</style>
