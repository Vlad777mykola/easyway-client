export const Variant = {
	primary: 'primary',
	secondary: 'secondary',
	success: 'success',
	error: 'error',
	dark: 'dark',
	default: 'default',
	'on-dark': 'on-dark',
};

export const Size = {
	xs: 'xs',
	s: 's',
	m: 'm',
	l: 'l',
	xl: 'xl',
};

export type SizeType = keyof typeof Size;
export type VariantType = keyof typeof Variant;
