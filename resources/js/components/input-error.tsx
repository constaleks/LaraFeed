import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

function InputError({ message, className, ...props }: InputErrorProps) {
    if (!message) {
        return null;
    }

    return (
        <p className={cn("text-destructive text-sm mt-1", className)} {...props}>
            {message}
        </p>
    );
}

export default InputError;