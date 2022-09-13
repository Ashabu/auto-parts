import WpressInstance  from './axiosApi';
import {ISignUpRequest, ISignUpResponse} from './types';

export const SignUp = async (data: ISignUpRequest) => {
    return await WpressInstance.post<ISignUpResponse>('/wp-json/api/flutter_user/register/', data)
}