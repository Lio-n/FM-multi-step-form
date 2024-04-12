export const validatePhoneNumber = (num: string): boolean =>
	/^\+\d{1,3} \d{3} \d{3} \d{3}$/.test(num);
