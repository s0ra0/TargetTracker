import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Auth } from "@supabase/auth-ui-react"

import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
    useSessionContext, 
    useSupabaseClient 
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import { SignInFlow } from "../types";
import { 
    ThemeMinimal, 
    ThemeSupa 
} from "@supabase/auth-ui-shared";


interface SignInCardProps{
    setState: (state: SignInFlow) => void;
};



export const SignInCard = ({ setState }: SignInCardProps) => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Card className="w-full h-full p-8">
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
                            colors:{
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
    );
};