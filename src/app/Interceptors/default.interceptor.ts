import { HttpInterceptorFn } from '@angular/common/http';
import { IAuthData } from '../Models/i-auth-data';

export const defaultInterceptor: HttpInterceptorFn = (req, next) => {
  let stringUser:string|null =localStorage.getItem('user');
  if(!stringUser) return next(req);

  let user:IAuthData = JSON.parse(stringUser)
  let newReq = req.clone({
    setHeaders:{

      Authorization: user.accessToken
    }
  })
  return next(newReq)
};
