import { z } from "zod";

export type FieldErrors = Record<string, string[]>;

const invalidFieldsMessage = "შეამოწმეთ მითითებული ველები";
const failedMessage = "ოპერაცია ვერ შესრულდა";

export class AdminError extends Error {
	fieldErrors: FieldErrors;

	constructor(message: string, fieldErrors: FieldErrors = {}) {
		super(message);
		this.name = "AdminError";
		this.fieldErrors = fieldErrors;
	}
}

export function validationDetails(error: unknown): {
	message: string;
	fieldErrors: FieldErrors;
} {
	if (error instanceof z.ZodError) {
		const { formErrors, fieldErrors } = z.flattenError(error);
		return {
			message: formErrors.join("; ") || invalidFieldsMessage,
			fieldErrors: fieldErrors as FieldErrors,
		};
	}
	if (error instanceof AdminError)
		return { message: error.message, fieldErrors: error.fieldErrors };

	return {
		message: error instanceof Error ? error.message : failedMessage,
		fieldErrors: {},
	};
}
