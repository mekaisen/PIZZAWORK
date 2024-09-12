import { api } from '../../../instance';

export interface PostUserSignInParams {
  phone: string;
  code: number
}
export type PostOtpPhoneRequestConfig = RequestConfig<PostUserSignInParams>;

export const postUserSignIn = ({ params, config }: PostOtpPhoneRequestConfig) => api.post<SignInResponse>('/users/signin', params, config);
