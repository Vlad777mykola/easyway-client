import React from 'react';

export const handleFileChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	parseFile: (fileString: string) => void,
) => {
	const file = event.target.files?.[0];

	if (file && (file.type === 'text/xml' || file.type === 'application/json')) {
		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			const fileString = e.target?.result as string;
			parseFile(fileString);
		};
		reader.readAsText(file);
	}
};

export const checkIsCorrectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
	const file = event.target.files?.[0];

	if (!file) {
		return 'File is required';
	}

	const allowedTypes = ['application/json', 'text/xml'];

	if (!allowedTypes.includes(file.type)) {
		return 'Invalid file type. Please upload a valid file.';
	}

	if (file.size === 0) {
		return 'File cannot be empty.';
	}
};
