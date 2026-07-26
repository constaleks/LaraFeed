import { Form, Link } from '@inertiajs/react';

import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';

import { store } from '@/actions/App/Http/Controllers/LoginController';
import { create as registerCreate } from '@/actions/App/Http/Controllers/RegisterController';

export default function LoginCreate() {
    return (
        <AuthLayout title="Log in to your account" description="Welcome back! Enter your details below.">
            <Form action={store()} resetOnSuccess={["password"]}>
                {({ errors, processing }) => (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />
                            <InputError message={errors.email} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" autoComplete="current-password" aria-invalid={!!errors.password} />
                            <InputError message={errors.password} />
                        </div>

                        <Label htmlFor="remember" className="cursor-pointer">
                            <Checkbox id="remember" name="remember" value="1" uncheckedValue="0" />
                            Remember me
                        </Label>

                        <Button type="submit" className="mt-2 cursor-pointer" disabled={processing}>
                            Log in
                        </Button>
                    </div>
                )}
            </Form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                <span>Don't have an account? </span>
                <Link href={registerCreate()} className="font-medium text-foreground underline-offset-4 hover:underline">
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
}
