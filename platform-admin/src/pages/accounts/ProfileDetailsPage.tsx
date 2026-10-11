import {TitleHeading} from "@/components/Heading.tsx";
import { Card } from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useAppSelector} from "@/hooks/use-store.ts";
import { Button } from "@/components/ui/button";


export const ProfileDetailsPage = () => {
    const user = useAppSelector(state => state?.auth?.user);
    return (
        <div>
            <TitleHeading title='My Account'
                          description={`Your profile, password, two-factor authentication, and where you're currently signed in.`} />

            <div className='space-y-4 space-x-4 mt-4 lg:mt-6'>

                {/* User Details and Role */}
                <div className="grid grid-cols-3 gap-6 lg:gap-8">
                    <div className="col-span-2">
                        <Card className="p-4 lg:p-6">
                            <div>
                                <Avatar className='cursor-pointer w-14 h-14'>
                                    <AvatarImage src={user?.profile_image} />
                                    <AvatarFallback className='bg-primary font-semibold text-white'>{user?.avatarName}</AvatarFallback>
                                </Avatar>
                            </div>

                            <div>
                                <Button variant="outline">Edit Profile</Button>
                            </div>
                        </Card>
                    </div>

                    <div>
                        <Card></Card>
                    </div>
                </div>

                {/* Password & Security */}
                {/* Session Details */}
            </div>
        </div>
    );
};
