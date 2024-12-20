import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image'; // Для оптимизации изображений (рекомендуется)

const ProfileButton: React.FC = () => { // Явно указываем тип компонента
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();
  const user = useUser();


  useEffect(() => {
    async function downloadImage() {
      if (user) {
        try {
          const { data, error } = await supabaseClient.storage
            .from('avatars_url') // Замените 'avatars' на название вашего бакета
            .download(user.id); // Предполагается, что имя файла - user.id
          if (error) {
            throw error;
          }
          const url = URL.createObjectURL(data);
          setAvatarUrl(url);
        } catch (error) {
          console.error('Error downloading avatar: ', error);
          // Обработка ошибки, например, установка дефолтной аватарки
        }
      }
    }

    downloadImage();
  }, [user, supabaseClient]);

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
  };

  if (!user) {
    return null; // Или отобразите кнопку "Войти"
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>{/* Для выравнивания */}
      <button
        onClick={handleSignOut}
        style={{
          backgroundColor: 'black', // Цвет фона кнопки Logout
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          marginRight: '10px',
        }}
      >
        Logout
      </button>
      <button
        style={{
          borderRadius: '50%', // Делаем кнопку круглой
          width: '40px', // Задаем ширину и высоту
          height: '40px',
          overflow: 'hidden', // Скрываем выходящее за границы изображение
          border: 'none', // Убираем рамку кнопки
          padding: 0, // Убираем внутренние отступы
        }}
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={40}
            height={40}
            style={{ objectFit: 'cover' }} // Важно для правильного отображения
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'gray',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: 'white'
          }}> {/* Отображение инициалов или заглушки */}
            {user.email ? user.email.slice(0, 2).toUpperCase() : "?"}
          </div>
        )}
      </button>
    </div>
  );
};
export default ProfileButton;