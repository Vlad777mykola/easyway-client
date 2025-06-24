import { z } from 'zod';

const xmlFileSchema = z
	.instanceof(File)
	.refine((file) => file.type === 'text/xml' || file.name.toLowerCase().endsWith('.xml'), {
		message: 'File must be an XML file.',
	})
	.refine((file) => file.size > 0, {
		message: 'File cannot be empty.',
	});

export const schema = z.object({
	name: z.string().min(3, 'Name is required'),
	transcription: z.string().min(3, 'Transcription is required'),
	translate: z.string().min(3, 'Translate is required'),
	useCase: z.string().min(3, 'Use case is required'),
	type: z.string().min(1, 'Select at least one type'),
	variants: z.array(z.string()).min(1, 'Select at least one type'),
	xmlFile: xmlFileSchema,
});
