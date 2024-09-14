import { api } from '../../../instance';

export interface PostUserSignInParams {
  phone: string;
  code: number
}
export type PostUserSignInRequestConfig = RequestConfig<PostUserSignInParams>;

export const postUserSignIn = ({ params, config }: PostUserSignInRequestConfig) => api.post<SignInResponse>('/users/signin', params, config);
