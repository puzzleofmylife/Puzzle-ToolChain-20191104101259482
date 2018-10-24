import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  setAccessToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getAccessToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    // get the token
    return tokenNotExpired();
  }
}