'use client';

import { useUser } from "../../hooks/useUser";



export default function UserDashboard() {
    const { user } = useUser();

    return (
        <div>
            <h2>Welcome, {user?.email || 'Guest'}!</h2>
        </div>
    );
}