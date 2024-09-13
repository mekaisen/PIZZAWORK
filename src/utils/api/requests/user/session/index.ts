import { api } from '../../../instance';

export type GetUserSessionConfig = AxiosRequestConfig;

const getUserSession = (requestConfig?: GetUserSessionConfig) => {
  return api.get<SessionResponse>('/users/session', requestConfig?.config);
};
export { getUserSession };
