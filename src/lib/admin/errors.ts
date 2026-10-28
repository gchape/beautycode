import { z } from "zod";

export class AdminError extends Error {
	fieldErrors: Record<string, string[]>;
	constructor(message: string, fieldErrors: Record<string, string[]> = {}) {
		super(message);
		this.name = "AdminError";
		this.fieldErrors = fieldErrors;
	}
}

export function validationDetails(error: unknown) {
	if (error instanceof z.ZodError) {
		const { formErrors, fieldErrors } = z.flattenError(error);
		return {
			message: formErrors.join("; ") || "შეამოწმეთ მითითებული ველები",
			fieldErrors: fieldErrors as Record<string, string[]>,
		};
	}
	return {
		message: error instanceof Error ? error.message : "ოპერაცია ვერ შესრულდა",
		fieldErrors: error instanceof AdminError ? error.fieldErrors : {},
	};
}
