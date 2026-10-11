import { Button } from "@/components/ui/button";
import {FieldGroup, Field, FieldLabel} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {Link, useNavigate} from "react-router";
import {ShieldCheckIcon} from "lucide-react";
import {useState} from "react";
import { Spinner } from "@/components/ui/spinner";
import {useDispatch} from "react-redux";
import {fetchLogin} from "@/store/auths/authSlice.ts";
import {getAxiosErrorMessage} from "@/lib/api.error.ts";
import type {loginResponse} from "@/api/auth.ts";

export default function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        setError("");

        try {
            const response = await dispatch(
                fetchLogin({ email, password })
            ).unwrap();

            if (
                response?.accessToken &&
                response?.refreshToken &&
                response?.userType
            ) {
                navigate("/dashboard");
            } else {
                setError("Login response is missing required fields.");
            }
        } catch (error: unknown) {
            setError(
                typeof error === "string"
                    ? error
                    : getAxiosErrorMessage(error, "Failed to login")
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='w-full max-w-sm'>
            <h2 className='text-2xl font-bold'>Sign In</h2>
            <p className='mt-1.5 text-sm text-muted-foreground'>Access the platform admin console.</p>

            <form className='mt-7' onSubmit={handleSubmit}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Work Email</FieldLabel>
                        <Input id="email" type="email" placeholder="you@platform.com"
                               autoCapitalize="username" className="h-11" required
                               value={email} onChange={(e) => setEmail(e.target.value)}
                               disabled={isSubmitting}
                        />
                    </Field>

                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Link
                                to={"/auth/forgot-password"}
                                className="text-sm font-medium text-primary hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                        <Input id="password" type="password" className="h-11" placeholder="Enter your password"
                               autoComplete="current-password" required
                               value={password} onChange={(e) => setPassword(e.target.value)}
                               disabled={isSubmitting}
                        />
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
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}

                    </Button>
                </FieldGroup>
            </form>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheckIcon className="size=3.5" />
                Protected by SSO and 2-factor verification.
            </div>
        </div>
    );
}