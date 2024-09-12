import { api } from '../../../instance';

export interface PostOtpPhoneParams {
  phone: string;
}
export type PostOtpPhoneRequestConfig = RequestConfig<PostOtpPhoneParams>;

export const postAuthOtp = ({ params, config }: PostOtpPhoneRequestConfig) => api.post<OtpResponse>('auth/otp', params, config);
