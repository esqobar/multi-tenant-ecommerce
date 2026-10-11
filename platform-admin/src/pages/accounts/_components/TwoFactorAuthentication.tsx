import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {TitleHeading} from "@/components/Heading.tsx";
import {useState} from "react";
import {useAppDispatch} from "@/hooks/use-store.ts";
import {Label} from "@/components/ui/label.tsx";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp.tsx";
import type {IUser} from "@/store/auths/authSlice.ts";
import {Input} from "@/components/ui/input.tsx";

export const TwoFactorAuthentication = ({ user }: { user: Partial<IUser> }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const [otpSend, setOtpSend] = useState<boolean>(false)
    const [otp, setOtp] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">Disable</Button>
            </DialogTrigger>
            <DialogContent className='w-full lg:max-w-2xl min-h-28 p-4 lg:p-6'>
                <TitleHeading
                    title='Two-Factor Authentication'
                    classNameTitle='font-semibold'
                    description='Enable two factor authentication....'
                />
                <form onSubmit={handleSubmit} className='grid gap-4 lg:gap-6 mt-4'>
                    <div className='grid gap-1'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            disabled
                            value={user?.email}
                            placeholder='Enter your email...'
                            className='h-10 font-bold'
                        />
                    </div>

                    <div className='mt-4'>
                        <Button className='mx-auto block h-10'>
                            {
                                isLoading ? "Sending otp..." : "Send OTP"
                            }
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
