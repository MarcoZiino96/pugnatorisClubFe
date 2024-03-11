import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthData } from '../Models/i-auth-data';
import { IRegister } from '../Models/i-register';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ILogin } from '../Models/i-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendUrl: string = `${environment.backEndUrl}`

  jwtHelper : JwtHelperService = new JwtHelperService();
  authSubject = new BehaviorSubject<IAuthData | null>(null)
  user$: Observable<IAuthData | null> = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map(user => !!user))


  constructor(private http:HttpClient, private router:Router) {
    this.restoreUser();
   }

  signUp(register:IRegister):Observable<IAuthData>{
    return this.http.post<IAuthData>(`${this.backendUrl}/auth/register`, register)
  }

  logIn(logInData:ILogin){
    return this.http.post<IAuthData>(`${this.backendUrl}/auth/login`, logInData)
    .pipe(tap(data=>{
      this.authSubject.next(data);
      localStorage.setItem('accessData', JSON.stringify(data));
      this.autoLogout(data.accessToken)
    }))
  }

  autoLogout(jwt:string){
    let expDate =this.jwtHelper.getTokenExpirationDate(jwt) as Date;
    let expMs = expDate.getTime() - new Date().getTime()


  setTimeout(()=> {
    this.logout()
  }, expMs)
  }

  logout(){
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/auth/login']);
  }

  restoreUser(){
    const userJson:string|null = localStorage.getItem('accessData');
    if(!userJson) return;

    const accessData:IAuthData = JSON.parse(userJson);
    if(this.jwtHelper.isTokenExpired(accessData.accessToken)) return

    this.autoLogout(accessData.accessToken)
    this.authSubject.next(accessData)
  }
}