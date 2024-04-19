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
	monthly_price: number;
	yearly_price: number;
};

export enum ADDONS_TYPE {
	'online_service',
	'large_storage',
	'customizable_profile'
}

export type Addon = {
	type: Partial<keyof typeof ADDONS_TYPE>;
	title: string;
	monthly_price: number;
	yearly_price: number;
};

export type RequestData = {
	PersonalInfo: PersonalInfo;
	BillingPlan: BillingPlan;
	Addons: Addon[] | [];
};

export const form_state = writable<RequestData>({
	PersonalInfo: {
		name: '',
		email_address: '',
		phone_number: ''
	},
	BillingPlan: {
		category: PLAN_CATEGORY[PLAN_CATEGORY.Arcade] as keyof typeof PLAN_CATEGORY,
		duration: PLAN_DURATION[PLAN_DURATION.Monthly] as keyof typeof PLAN_DURATION,
		monthly_price: 9,
		yearly_price: 90
	},
	Addons: []
});
