"use client";

import { useState } from "react";

import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import { 
    useSessionContext, 
    useSupabaseClient 
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";



export const AuthScreen = () => {

    const [state, setState] = useState<SignInFlow>("signIn");
    return (
        
        <div className="h-full flex items-center justify-center bg-gradient-to-r from-[#272727] via-[#303030] to-[#232323]">
            <div className="md:h-auto md:w-[420px]">
                {state === "signIn" ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
            </div>
        </div>
    );
};