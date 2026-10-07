import * as React from "react";
import type {InputGroup} from "@/components/ui/input-group.tsx";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Eye, EyeOff} from "lucide-react";
import { cn } from "@/lib/utils";

export const PasswordInput = ({
    className,
    ...props
                              }: React.ComponentProps<typeof Input>) => {

    const [visible, setVisible] = useState<boolean>(false);
    return (
        <div className='relative'>
            <Input
                type={visible ? 'text' : 'password'}
                   className={cn("pr-10", className)}
                {...props} />
            <button className='button'
                    tabIndex={-1}
                    onClick={() => setVisible(prevState => !prevState)}
                    aria-label={visible ? "Hide password" : "Show password"}
                    className='absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground hover:text-foreground'
            >
                {visible ? (
                    <EyeOff className='size-4' />
                ) : (
                    <Eye className='size-4' />
                )}
            </button>
        </div>
    );
};
