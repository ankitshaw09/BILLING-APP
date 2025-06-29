import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile } from './authAPI';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchUserProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] }); // also use object syntax here
    },
  });
};

