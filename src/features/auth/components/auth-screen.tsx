'use client'

import { Button } from '@/components/ui/button';
import { Auth } from "@supabase/auth-ui-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { AuthFlow } from "../types";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useUser } from "../../../../hooks/useUser";
import { useAuthModal } from "../../../../hooks/useAuthModal";
import { toast } from 'react-hot-toast';
import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import ProfileButton from '@/components/ProfileButton';

interface AuthProps {
    setState: (state: AuthFlow) => void;
};

export const AuthScreen = ({ setState }: AuthProps) => {
    const authModal = useAuthModal();
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    // Слушатель на событие успешной авторизации
    React.useEffect(() => {
        if (user) {
            // После успешной авторизации, перенаправляем на главную страницу
            router.push('@/page.tsx');  // Убедитесь, что путь правильный
        }
    }, [user, router]);

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Logged out!');
        }
    };

    return (
        <div>
            {user ? (
                <div className="flex justify-center items-center h-screen">
                    <ProfileButton/>
                </div>
            ) : (
                <div className='h-screen flex items-center justify-center'>
                    <Card className="w-500 p-8">
                        <CardHeader className="px-0 pt-0">
                            <CardTitle className="w-full h-full">
                                Welcome!
                            </CardTitle>
                            <CardDescription>
                                Use your email or another service to continue
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 px-0 pb-0">
                            <Auth
                                providers={["github"]}
                                magicLink
                                supabaseClient={supabaseClient}
                                appearance={{
                                    theme: ThemeSupa,
                                    variables: {
                                        default: {
                                            colors: {
                                                brand: "#222222",
                                                brandAccent: "#424242",
                                            },
                                            fonts: {
                                                bodyFontFamily: "El Messiri",
                                                buttonFontFamily: "El Messiri",
                                                inputFontFamily: "El Messiri",
                                                labelFontFamily: "El Messiri",
                                            },
                                            radii: {
                                                borderRadiusButton: '8px',
                                                buttonBorderRadius: '8px',
                                                inputBorderRadius: '8px',
                                            },
                                        }
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};
