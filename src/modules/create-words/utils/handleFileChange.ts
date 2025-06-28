import React from 'react';

export const handleFileChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	parseFile: (fileString: string) => void,
) => {
	const file = event.target.files?.[0];

	if (!file) return;

	if (file && (file.type === 'text/xml' || file.type === 'application/json')) {
		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			const fileString = e.target?.result as string;
			parseFile(fileString);
		};
		reader.readAsText(file);
	}
};
