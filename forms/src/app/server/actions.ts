import { ApiResponse, SignInFormData, signInSchema } from "../lib/types";

export const handleSignIn = async (
	formData: FormData,
): Promise<ApiResponse> => {
	const rawData: SignInFormData = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const redirectTo = formData.get("redirectTo") as string;

	const validateData = signInSchema.safeParse(rawData);

	if (!validateData.success) {
		// Convert Zod issues to { field: [messages] }
		const fieldErrors = validateData.error.issues.reduce<
			Record<string, string[]>
		>((acc, issue) => {
			const field = issue.path[0] as string;
			if (!acc[field]) acc[field] = [];
			acc[field].push(issue.message);
			return acc;
		}, {});

		return {
			data: null,
			isSuccessful: false,
			message: "Please fix the errors in the form.",
			errors: fieldErrors,
			inputs: rawData,
		};
	}

	return {
		data: validateData.data,
		redirectTo: redirectTo,
		isSuccessful: true,
	};
};
