import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  constructor() { }

  toast = signal<{ type: 'error' | 'success', message: string } | null>(null);
    // Ẩn thông báo
  
  hideToast() {
    this.toast.set(null);
  }

  // Kiểm tra đầu vào input email , password bao gồm chữ hoa , chữ thường , số và ký tự đặc biệt
  validateInput(input: string): boolean {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(input);
  }
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }
  // createJWT token
  createToken(payload: any, secret: string, expiresIn: number): string {
    // Simple base64 encoding for demonstration purposes only
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify({ ...payload, exp: Date.now() + expiresIn * 1000 }));
    const signature = btoa(secret);
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
  // save JWT to local storage
  insertToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
  // get JWT from local storage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  // remove JWT from local storage
  removeToken(): void {
    localStorage.removeItem('authToken');
  }

}
