import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, signUpSchema, type SignInData, type SignUpData } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { LogIn, UserPlus } from 'lucide-react';

const UserAuth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: loginErrors },
        reset: resetLogin,
    } = useForm<SignInData>({
        resolver: zodResolver(signInSchema),
    });

    const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        formState: { errors: signupErrors },
        reset: resetSignup,
    } = useForm<SignUpData>({
        resolver: zodResolver(signUpSchema),
    });

    const onLogin = (data: SignInData) => {
        console.log('Login data:', data);
        alert(`Login successful!\nEmail: ${data.email}`);
        resetLogin();
    };

    const onSignup = (data: SignUpData) => {
        console.log('Signup data:', data);
        alert(`Signup successful!\nEmail: ${data.email}`);
        resetSignup();
    };

    return (
        <div className="max-w-md mx-auto">
            <Card className="p-8 shadow-xl">
                {/* Tab Buttons */}
                <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${isLogin
                            ? 'bg-white text-blue-600 shadow'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <LogIn className="w-4 h-4 inline-block mr-2" />
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${!isLogin
                            ? 'bg-white text-blue-600 shadow'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <UserPlus className="w-4 h-4 inline-block mr-2" />
                        Sign Up
                    </button>
                </div>

                {/* Login Form */}
                {isLogin ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
                        <form onSubmit={handleSubmitLogin(onLogin)} className="space-y-4">
                            <div>
                                <Label htmlFor="login-email">Email</Label>
                                <Input
                                    id="login-email"
                                    type="email"
                                    {...registerLogin('email')}
                                    placeholder="Enter your email"
                                    className="mt-1"
                                />
                                {loginErrors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {loginErrors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="login-password">Password</Label>
                                <Input
                                    id="login-password"
                                    type="password"
                                    {...registerLogin('password')}
                                    placeholder="Enter your password"
                                    className="mt-1"
                                />
                                {loginErrors.password && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {loginErrors.password.message}
                                    </p>
                                )}
                            </div>

                            <Button type="submit" className="w-full">
                                <LogIn className="w-4 h-4 mr-2" />
                                Login
                            </Button>
                        </form>

                        <p className="text-center text-sm text-gray-600 mt-4">
                            Don't have an account?{' '}
                            <button
                                onClick={() => setIsLogin(false)}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                ) : (
                    /* Sign Up Form */
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
                        <form onSubmit={handleSubmitSignup(onSignup)} className="space-y-4">
                            <div>
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    {...registerSignup('email')}
                                    placeholder="Enter your email"
                                    className="mt-1"
                                />
                                {signupErrors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {signupErrors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    {...registerSignup('password')}
                                    placeholder="Enter your password (min 6 characters)"
                                    className="mt-1"
                                />
                                {signupErrors.password && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {signupErrors.password.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                                <Input
                                    id="signup-confirm-password"
                                    type="password"
                                    {...registerSignup('confirmPassword')}
                                    placeholder="Confirm your password"
                                    className="mt-1"
                                />
                                {signupErrors.confirmPassword && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {signupErrors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            <Button type="submit" className="w-full">
                                <UserPlus className="w-4 h-4 mr-2" />
                                Sign Up
                            </Button>
                        </form>

                        <p className="text-center text-sm text-gray-600 mt-4">
                            Already have an account?{' '}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Login
                            </button>
                        </p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default UserAuth;
