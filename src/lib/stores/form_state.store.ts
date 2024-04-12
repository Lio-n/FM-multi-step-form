import { writable } from 'svelte/store';

export type PersonalInfo = {
	name: string;
	email_address: string;
	phone_number: string;
};

export type BillingPlan = {
	category: 'Arcade' | 'Advanced' | 'Pro'; // Enum
	duration: 'Monthly' | 'Yearly'; // Enum
};

export type Addons = {
	online_service: boolean;
	large_storage: boolean;
	customizable_profile: boolean;
};

export type RequestData = PersonalInfo & BillingPlan & Addons;

export const form_state = writable<RequestData>({
	name: '',
	email_address: '',
	phone_number: '',
	category: 'Arcade',
	duration: 'Monthly',
	online_service: false,
	large_storage: false,
	customizable_profile: false
});
