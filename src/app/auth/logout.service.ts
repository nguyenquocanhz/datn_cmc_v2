import { Injectable } from '@angular/core';
import { AuthServicesService } from '../Helpers/auth-services.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private authService: AuthServicesService, private router: Router) { }

  logout(): void {
    // gọi AuthServicesService để xóa token khỏi local storage
    this.authService.removeToken();
    // chuyển hướng đến trang đăng nhập
    this.router.navigate(['/login']);
  }
}
