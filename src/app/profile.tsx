import ProfileButton from '../components/ProfileButton';
import { useUser } from '@supabase/auth-helpers-react';

export default function ProfilePage() {
    const user = useUser();

    if (!user) {
        return <p>Пожалуйста, войдите в систему.</p>;
    }

    return (
        <div>
            <h1>Страница профиля</h1>
            <p>Добро пожаловать, {user.email}!</p>
            <ProfileButton /> {/* Используем компонент */}
            {/* Другой контент страницы профиля */}
        </div>
    );
}