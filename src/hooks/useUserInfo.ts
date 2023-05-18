import { useEffect, useState } from 'react';
import { User } from '../types/User';
import UserAPI from '../api/UserAPI';

export default function useUserInfo(): User | null {
  const accessToken = localStorage.getItem('access-token'); // dependency
  const [userInfo, setUserInfo] = useState<User>();

  const updateUserInfo = () => {
    UserAPI.findMyInfo()
      .then((resp) => setUserInfo(resp.data))
      .catch(() => {});
  };

  useEffect(() => updateUserInfo(), [accessToken]);

  return userInfo ?? null;
}
