import { writable } from 'svelte/store';

export type PersonalInfo = {
	name: string;
	email_address: string;
	phone_number: string;
};

export enum PLAN_CATEGORY {
	'Arcade',
	'Advanced',
	'Pro'
}

export enum PLAN_DURATION {
	'Monthly',
	'Yearly'
}

export type BillingPlan = {
	category: Partial<keyof typeof PLAN_CATEGORY>; // Enum
	duration: Partial<keyof typeof PLAN_DURATION>; // 'Monthly' | 'Yearly'
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
	category: PLAN_CATEGORY[PLAN_CATEGORY.Arcade] as keyof typeof PLAN_CATEGORY,
	duration: PLAN_DURATION[PLAN_DURATION.Monthly] as keyof typeof PLAN_DURATION,
	online_service: false,
	large_storage: false,
	customizable_profile: false
});
