import { loginUser } from '../api/authAPI';
import { setCredentials } from '../redux/authSlice';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();

const loginMutation = useMutation(loginUser, {
  onSuccess: (data) => {
    dispatch(setCredentials({
      user: data.user,
      access: data.access,
      refresh: data.refresh,
    }));
  },
  onError: (err) => {
    console.error("Login failed:", err.response?.data);
  },
});
