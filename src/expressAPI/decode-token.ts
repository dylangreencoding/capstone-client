import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs';

export function isExpired (accessToken: string) {
  const user : any = jwt_decode(accessToken);
  return dayjs.unix(user.exp).diff(dayjs()) < 1;
}