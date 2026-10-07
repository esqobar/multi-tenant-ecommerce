import {useAppDispatch} from "@/hooks/use-store.ts";
import {useState} from "react";
import {Link, useLocation} from "react-router";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {CheckCircle2, ShieldCheckIcon} from "lucide-react";
import {PasswordInput} from "@/components/PasswordInput.tsx";

export const ResetPasswordPage = () => {
    const dispatch = useAppDispatch();

    const location = useLocation();
    const state = location.state as { email? : string, resetToken? : string } | null

    const email = state?.email;
    const resetToken = state?.resetToken;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const misMatch = confirmPassword.length > 0 && password !== confirmPassword

    const handleSubmit = (e) => {
        e.preventDefault();

        if (misMatch) return

        // if (!resetToken) {
        //     setError("Something went wrong")
        // }

        setIsSubmitting(true)

        // try {
            setTimeout(() => {
                setPassword("")
                setConfirmPassword("")
                setIsDone(true)
                setIsSubmitting(false)
            }, 2000)
        // } catch(err) {
        //     setError(typeof err ==="string" ? err : "Could not reset password")
        // } finally {

        // }

    }

    if (isDone) {
        return (
            <div className="w-full max-w-sm flex flex-col justify-center items-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-accent">
                    <CheckCircle2 className="size-6 text-primary"/>
                </div>
                <h2 className="mt-4 text-2xl font-bold">
                    Password Updated
                </h2>
                <p className="mt-2 text-sm text-muted-foreground text-center">
                    Your password has been reset. You can now sign in with your new password.
                </p>
                <Button className="mt-10 h-11 w-full">
                    <Link
                        to={"/auth/login"}
                    >
                        Back to sign in
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className='w-full max-w-sm'>
            <h2 className='text-2xl font-bold'>Set a new Password</h2>
            <p className='mt-1.5 text-sm text-muted-foreground'>
                {
                    email ? (
                        <>
                            New password for {" "}
                            <span className="font-medium text-foreground">
                                {email}
                            </span>
                        </>
                    ) : (
                        "Choose a new password for your account."
                    )
                }
            </p>

            <form className='mt-7' onSubmit={handleSubmit}>
                <FieldGroup>
                    <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>

                    <PasswordInput id="password" className="h-11" placeholder="Enter your password"
                                   autoComplete="new-password" required
                                   value={password} onChange={(e) => setPassword(e.target.value)}
                                   disabled={isSubmitting}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Confirm Password</FieldLabel>

                    <PasswordInput id="confirm-password" className="h-11" placeholder="Re-enter your password"
                                   autoComplete="confirm-password" required
                                   value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                   disabled={isSubmitting}
                    />
                    {
                        misMatch && <FieldError>Passwords do not match</FieldError>
                    }
                </Field>

                    {
                        error && (
                            <p className='mt-3 text-sm text-destructive'>{error}</p>
                        )
                    }

                    <Button type="submit" className="mt-6 h-11 w-full">
                        {isSubmitting ? (
                            <>
                                <Spinner className="size=4" />
                                Updating...
                            </>
                        ) : (
                            "Reset Password"
                        )}

                    </Button>
                </FieldGroup>
            </form>
        </div>
    );
};

