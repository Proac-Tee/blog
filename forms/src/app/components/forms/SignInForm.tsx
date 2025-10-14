"use client";

import { ApiResponse, SignInFormData } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";
import { handleSignIn } from "@/app/server/actions";
import { Button } from "@coniungo/ui";
import { useActionState } from "react";
import { toast } from "react-toastify";

const initialState: ApiResponse = {
	data: null,
	isSuccessful: false,
	message: "",
	errors: {},
	error: "",
};

export const SignInForm = () => {
	const [state, dispatch, isPending] = useActionState(
		async (_: ApiResponse | null, payload: FormData) => {
			const res = await handleSignIn(payload);

			const data = res.data as SignInFormData;

			if (res.isSuccessful) {
				toast.success(
					<div>
						<h3>Email: {data.email}</h3>
						<p>Password: {data.password}</p>
					</div>,
					{
						position: "top-right",
						autoClose: 5000,
					},
				);
			}

			return res;
		},
		initialState,
	);

	async function action(formData: FormData) {
		dispatch(formData);
	}

	return (
		<section className="p-6 md:p-8 md:pt-0 pt-0 max-w-[450px]">
			<h1 className="font-bold text-3xl mb-3">Sign in</h1>
			<form action={action} className="mt-9">
				<div className="my-5">
					<div
						className={cn(
							" w-full relative group border-b-[1px] border-b-[rgba(0,0,0,0.42)]  focus-within:border-b-[rgba(0,0,0,0.87)]",
							state.errors?.email && "border-b-red-500",
						)}
					>
						<input
							id="email"
							name="email"
							type="email"
							defaultValue={String(state.inputs?.email ?? "")}
							required
							className={cn(
								"w-full peer text-sm  bg-background outline-transparent py-2",
							)}
						/>
						<label
							htmlFor="email"
							className="font-medium after:content-['*'] transform text-secondary   transition-all absolute top-0 left-0 h-full flex items-center text-md group-focus-within:text-xs group-focus-within:text-primary peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full"
						>
							Email Address
						</label>
						{state.errors?.email && (
							<p className="text-red-500 text-left my-3 text-xs">
								{state.errors?.email.join(", ")}
							</p>
						)}
					</div>
				</div>

				<div className="mt-6 mb-5">
					<div
						className={cn(
							"w-full relative group border-b-[1px] border-b-[rgba(0,0,0,0.42)]  focus-within:border-b-[rgba(0,0,0,0.87)]",
							state.errors?.password && "border-b-red-500",
						)}
					>
						<input
							id="password"
							name="password"
							type="password"
							defaultValue={String(state.inputs?.password ?? "")}
							required
							className=" w-full peer text-sm  bg-background outline-transparent py-2"
						/>
						<label
							htmlFor="password"
							className="font-medium after:content-['*'] transform text-secondary  transition-all absolute top-0 left-0 h-full flex items-center text-md group-focus-within:text-xs group-focus-within:text-primary peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full"
						>
							Password
						</label>
					</div>
					{state.errors?.password && (
						<p className="text-red-500 text-left  text-xs">
							{state.errors?.password.join(", ")}
						</p>
					)}
				</div>

				{state.error && (
					<p className="text-red-500 text-center my-3 text-xs">{state.error}</p>
				)}

				<div className="my-4">
					<Button
						intent={"secondary_outline"}
						radius={"md"}
						loading={isPending}
						className="min-w-[9rem] min-h-[3rem] bg-background"
						disabled={isPending}
						type="submit"
					>
						Sign In
					</Button>
				</div>
			</form>
		</section>
	);
};
