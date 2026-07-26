import { Form, Link } from '@inertiajs/react';

import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

import { store } from '@/actions/App/Http/Controllers/RegisterController';
import { create as loginCreate } from '@/actions/App/Http/Controllers/LoginController';

export default function RegisterCreate() {
    return (
        <AuthLayout title="Create your account" description="Join LaraFeed and start sharing your thoughts.">
            <Form action={store()} resetOnSuccess={["password", "password_confirmation"]}>
                {({ errors, processing }) => (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" type="text" autoComplete="name" aria-invalid={!!errors.name} />
                            <InputError message={errors.name} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />
                            <InputError message={errors.email} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" autoComplete="new-password" aria-invalid={!!errors.password} />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input id="password_confirmation" name="password_confirmation" type="password" autoComplete="new-password" aria-invalid={!!errors.password_confirmation} />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <Button type="submit" className="mt-2 cursor-pointer" disabled={processing}>
                            Create account
                        </Button>
                    </div>
                )}
            </Form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                <span>Already have an account? </span>
                <Link href={loginCreate()} className="font-medium text-foreground underline-offset-4 hover:underline">
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
}
