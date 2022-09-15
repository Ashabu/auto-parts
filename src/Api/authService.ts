import WpressInstance  from './axiosApi';
import {ISignUpRequest, ISignUpResponse, ISignInRequest, ISignInResponse} from './types';

const COOKIE_LIFETIME = 120960000000;


export const SignUp = async (data: ISignUpRequest) => {
    return await WpressInstance.post<ISignUpResponse>('/wp-json/api/flutter_user/register/', data);
};

export const SignIn = async(data: ISignInRequest) => {
    return await WpressInstance.post<ISignInResponse>('/wp-json/api/flutter_user/generate_auth_cookie', {...data, seconds: COOKIE_LIFETIME});
};