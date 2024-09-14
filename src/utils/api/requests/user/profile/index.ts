import { api } from '../../../instance';

export interface PatchUserProfileParams {
  profile: {
    email: string;
    city: string;
    lastname: string;
    middlename: string;
    firstname: string;
  }
  phone: string;
}
export type PatchUserProfileConfig = RequestConfig<PatchUserProfileParams>;

export const patchUserProfile = ({ params, config }: PatchUserProfileConfig) => api.patch<SignInResponse>('/users/profile', params, config);
