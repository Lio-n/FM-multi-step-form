<script lang="ts">
	import type { PersonalInfo } from '$lib/stores/form_state.store';
	import { validatePhoneNumber } from '../../validations/phone_number.validate';
	import './shared.css';

	export let id: string;
	export let onSubmit: (e: PersonalInfo) => void;
	export const state: PersonalInfo = {
		name: '',
		email_address: '',
		phone_number: ''
	};
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

		console.log(`I'm personalInfoForm`, { requestData, isValid });
		if (isValid) onSubmit(requestData);
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
		<label for="name">Name</label>
		<input id="name" name="name" bind:value={state.name} placeholder="e.g. Stephen King" required />
	</div>

	<div class="input__group">
		<label for="email_address">Email Address</label>
		<input
			id="email_address"
			name="email_address"
			bind:value={state.email_address}
			placeholder="e.g. Stephenking@lorem.com"
			type="email"
			required
		/>
	</div>

	<div class="input__group">
		<label for="phone_number">Phone Number</label>
		<input
			id="phone_number"
			name="phone_number"
			bind:value={state.phone_number}
			placeholder="e.g. +1 234 567 890"
			required
		/>
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
	}

	.input__group label {
		margin-left: 0.25rem;
	}

	.input__group input {
		padding: 0.75rem;
		font-size: 1rem;
		border: 1px solid var(--neutral-300);

		border-radius: 0.5rem;
		background-color: var(--neutral-100);
		outline: none;
	}

	.input__group input:focus {
		border-color: var(--primary-400);
	}

	.input__group input::placeholder {
		color: var(--neutral-400);
	}
</style>
