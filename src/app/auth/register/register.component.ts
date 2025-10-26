import { Component, signal } from '@angular/core';
import { AuthServicesService } from '../../Helpers/auth-services.service';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public authServices: AuthServicesService = new AuthServicesService();
  constructor(private router: Router) { }


  showLoginPassword = signal(false);
  // Bật/tắt hiển thị mật khẩu
  toggleLoginPassword() {
    this.showLoginPassword.update(v => !v);
  }
  // toast from AuthServicesService
  toast = this.authServices.toast;
  hideToast() {
    this.authServices.hideToast();
  }
  registerFullName = signal('');
  registerEmail = signal('');
  registerPassword = signal('')
  registerRePassword = signal('');
  
  doRegister(event: Event) {
    event.preventDefault();
    const fullName = this.registerFullName();
    const email = this.registerEmail();
    const password = this.registerPassword();
    const rePassword = this.registerRePassword();
    // Kiểm tra email và password không rỗng
    if (!email || !password) {
      this.toast.set({ type: 'error', message: 'Vui lòng nhập đầy đủ thông tin.' });
      setTimeout(() => this.hideToast(), 3000);
      return;
    }
    // Kiểm tra email hợp lệ (rất đơn giản)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      this.toast.set({ type: 'error', message: 'Địa chỉ email không hợp lệ.' });
      setTimeout(() => this.hideToast(), 3000);
      return;
    }
    // Kiểm tra SQL Injection cơ bản
    if (email.includes("'") || password.includes("'")) {
      this.toast.set({ type: 'error', message: 'Dữ liệu nhập vào không hợp lệ.' });
      setTimeout(() => this.hideToast(), 3000);
      return;
    }
    console.log('Đăng ký với:', email, password);
    this.toast.set({ type: 'success', message: 'Đăng ký thành công!' });
    // khởi tạo session chuyển hướng đến trang chính
    this.router.navigate(['/home']);
    setTimeout(() => this.hideToast(), 3000);
  }
}
