// import {useEffect, useState} from 'react';
// import {useMutation, useQuery} from '@tanstack/react-query';
// import axios from 'axios';
// import {getAccessToken, getProfile, logout, postLogin} from '@/api/auth';
// import queryClient from '@/api/queryClient';
// import {queryKeys, storageKeys} from '@/constants';
// import {numbers} from '@/constants/numbers';
// import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
// import {
//   getEncryptStorage,
//   removeEncryptStorage,
//   removeHeader,
//   setEncryptStorage,
//   setHeader,
// } from '@/utils';

// function useLogin(mutationOptions?: UseMutationCustomOptions) {
//   const mutation = useMutation({
//     mutationFn: postLogin,
//     onSuccess: async ({accessToken, refreshToken, admin}) => {
//       console.log(
//         `useMutation: accessToken = ${accessToken}, refreshToken = ${refreshToken}, admin = ${admin}`
//       );
//       try {
//         if (refreshToken) {
//           await setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
//           console.log(`[useAuth] Try to Set refreshToken: ${refreshToken}`);
//         }
//         setHeader('Authorization', `Bearer ${accessToken}`);
//         queryClient.setQueryData([queryKeys.ADMIN_STATUS], admin);

//         await queryClient.fetchQuery({
//           queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
//           queryFn: getProfile,
//         });
//       } catch (error) {
//         console.error('Login success handling error:', error);
//         // 에러 발생 시 cleanup
//         // await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
//         // removeHeader('Authorization');
//         throw error;
//       }
//     },
//     onSettled: () => {
//       queryClient.refetchQueries({
//         queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
//       });
//       queryClient.invalidateQueries({
//         queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
//       });
//     },
//     ...mutationOptions,
//   });
//   const {data: isAdmin} = useQuery({
//     queryKey: [queryKeys.ADMIN_STATUS],
//     queryFn: () => queryClient.getQueryData([queryKeys.ADMIN_STATUS]),
//     enabled: true,
//     initialData: null,
//   });
//   return {mutation, isAdmin};
// }

// // 토큰 갱신
// function useGetRefreshToken() {
//   const {isSuccess, data, isError, error} = useQuery({
//     queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
//     queryFn: getAccessToken,
//     staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
//     refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
//     refetchOnReconnect: true,
//     refetchIntervalInBackground: true,
//   });

//   useEffect(() => {
//     if (isSuccess && data.accessToken && data.refreshToken) {
//       setHeader('Authorization', `Bearer ${data.accessToken}`);
//       setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
//     }
//   }, [isSuccess, data?.accessToken, data?.refreshToken]);

//   // useEffect(() => {
//   //   if (isSuccess && data) {
//   //     console.log('success to get access token', data);
//   //     const setupTokens = async () => {
//   //       try {
//   //         await setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
//   //         setHeader('Authorization', `Bearer ${data.accessToken}`);
//   //       } catch (error) {
//   //         console.error('Error setting up tokens:', error);
//   //       }
//   //     };
//   //     setupTokens();
//   //   }
//   // }, [isSuccess, data]);

//   // useEffect(() => {
//   //   if (isError) {
//   //     removeHeader('Authorization');
//   //     removeEncryptStorage(storageKeys.REFRESH_TOKEN);
//   //   }
//   // }, [isError]);

//   useEffect(() => {
//     if (isError && error && axios.isAxiosError(error)) {
//       // if (error.response?.status === 401) {
//       console.log(error);
//       // removeHeader('Authorization');
//       // removeEncryptStorage(storageKeys.REFRESH_TOKEN);
//       // }
//     }
//   }, [isError, error]);

//   return {isSuccess, isError};
// }

// function useGetProfile(queryOptions?: UseQueryCustomOptions) {
//   return useQuery({
//     queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
//     queryFn: getProfile,
//     ...queryOptions,
//   });
// }

// function useLogout(mutationOptions?: UseMutationCustomOptions) {
//   return useMutation({
//     mutationFn: logout,
//     onSuccess: () => {
//       removeHeader('Authorization');
//       removeEncryptStorage(storageKeys.REFRESH_TOKEN);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
//     },
//     ...mutationOptions,
//   });
// }

// function useAuth() {
//   const refreshTokenQuery = useGetRefreshToken();
//   const getProfileQuery = useGetProfile({
//     enabled: refreshTokenQuery.isSuccess,
//   });
//   const isLogin = getProfileQuery.isSuccess;
//   const {mutation: loginMutation, isAdmin} = useLogin();
//   const logoutMutation = useLogout();

//   return {
//     loginMutation,
//     isAdmin,
//     getProfileQuery,
//     isLogin,
//     logoutMutation,
//   };
// }

// export default useAuth;
