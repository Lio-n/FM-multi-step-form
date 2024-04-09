import { writable } from 'svelte/store';

export type RequestData = {
	firstName: string;
	lastName: string;
	aboutMe: string;
};
export const form_state = writable({ firstName: '', lastName: '', aboutMe: '' });
