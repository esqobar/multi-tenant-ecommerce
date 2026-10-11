import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {TitleHeading} from "@/components/Heading.tsx";
import {useState} from "react";
import {PasswordInput} from "@/components/PasswordInput.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useAppDispatch} from "@/hooks/use-store.ts";
import {changePassword, logoutUser} from "@/store/auths/authSlice.ts";
import {toast} from "sonner";



export const ChangePassword = () => {
    const [data, setData] = useState({
        password: "", confirmPassword: ""
    })

    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleChange = (e: any) => {
        const { name, value } = e.target

        setData((prevState) => {
            return { ...prevState, [name]: value }
        })
    }

    const handleSubmit= async (e: any) => {
        e.preventDefault()

        if (data.password !== data.confirmPassword) {
            toast.error("Password and confirm password must be same.")
            return;
        }

        setIsLoading(true)
        const response: any = await dispatch(changePassword(data))

        if (response?.payload?.success) {
            toast.success(response?.payload?.message)
            setIsOpen(false)
            await dispatch(logoutUser())
        } else {
            toast.error(response?.payload?.message)
        }

        setIsLoading(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' className='cursor-pointer'>Change Password</Button>
            </DialogTrigger>
            <DialogContent className='w-full lg:max-w-2xl min-h-28 p-4 lg:p-6'>
                <TitleHeading
                    title='Change Passsword'
                    classNameTitle='font-semibold'
                    description='Update your password here...'
                />

                <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4'>
                    <div className='grid gap-1'>
                        <Label htmlFor='password'>Password</Label>
                        <PasswordInput
                            className='h-10'
                            id='password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='grid gap-1'>
                        <Label htmlFor='confirmPassword'>Confirm Password</Label>
                        <PasswordInput
                            className='h-10'
                            id='confirmPassword'
                            name='confirmPassword'
                            value={data.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>


                    <div className='col-span-2 mt-4'>
                        <Button className='mx-auto block h-10'>
                            {
                                isLoading ? "Updating..." : "Change Password"
                            }
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
