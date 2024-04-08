import { writable } from 'svelte/store';

export const form_state = writable({ firstName: '', lastName: '', aboutMe: '' });
