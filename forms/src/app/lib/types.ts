import * as z from "zod";

const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter")
	.regex(/[0-9]/, "Password must contain at least one number")
	.regex(
		/[^A-Za-z0-9]/,
		"Password must contain at least one special character",
	);

export const signInSchema = z.object({
	email: z.email({ pattern: z.regexes.html5Email }),
	password: passwordSchema,
});

export type SignInFormData = z.infer<typeof signInSchema>;

export type ApiResponse<TData = unknown, TInputs = Record<string, unknown>> = {
	data: TData | null;
	isSuccessful: boolean;
	statusCode?: number;
	message?: string;
	redirectTo?: string;
	Message?: string;
	idToken?: string;
	accessToken?: string;
	refreshToken?: string;
	url?: string;
	fileName?: string;
	body?: {
		accessToken?: string;
		idToken?: string;
		refreshToken?: string;
		expiresIn?: string;
		tokenType?: string;
		emailVerified?: boolean;
		cognitoUserId?: string;
		user?: object;
		imageBase64?: string;
	};
	errors?: Record<string, string[]>;
	error?: string;
	inputs?: TInputs;
};
