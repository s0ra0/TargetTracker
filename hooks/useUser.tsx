import { User } from "@supabase/auth-helpers-nextjs";
import { Subscription, UserDetails } from "../types";
import { createContext, useEffect, useState } from "react";
import 
{   useSessionContext, 
    useUser as useSupaUser 
}   from "@supabase/auth-helpers-react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null
}


export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any;
};

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase,
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription| null>(null);

    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscription = () => 
        supabase
            .from('subscriptions')
            .select('*, prices(*, products(*))')
            .in('status', ['trialing', 'active'])
            .single();
    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                (results) => {
                    const UserDetailsPromise = results[0];
                    const SubscriptionPromise = results[1];
                    if (UserDetailsPromise.status === 'fulfilled') {
                        setUserDetails(UserDetailsPromise.value.data as UserDetails);
                    }


                }
            )
        }
    }
    
    
    
    )

}