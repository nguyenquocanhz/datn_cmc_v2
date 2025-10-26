import { CommonModule, NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../Helpers/auth-services.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginEmail = signal('');
  loginPassword = signal('');
  isLoggedIn = signal(false);

  public authServices: AuthServicesService = new AuthServicesService();
  constructor(private router: Router) { }
  
  toast = this.authServices.toast;
  hideToast() {
    this.authServices.hideToast();
  }
  showLoginPassword = signal(false);
  // Bật/tắt hiển thị mật khẩu
  toggleLoginPassword() {
    this.showLoginPassword.update(v => !v);
  }
  // Xử lý sự kiện submit form (hiện tại chỉ log ra console và hiển thị toast)
  doLogin(event: Event) {
    event.preventDefault(); // Ngăn form reload trang
    // Check email và password không rỗng
    if (!this.loginEmail() || !this.loginPassword()) {
      this.toast.set({ type: 'error', message: 'Vui lòng nhập đầy đủ thông tin.' });
      setTimeout(() => this.hideToast(), 3000);
      return;
    }
    // check email hợp lệ (rất đơn giản)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.loginEmail())) {
      this.toast.set({ type: 'error', message: 'Địa chỉ email không hợp lệ.' });
      setTimeout(() => this.hideToast(), 3000);
      return;
    }
    // check SQL Injection cơ bản
    if (this.loginEmail().includes("'") || this.loginPassword().includes("'")) {
      this.toast.set({ type: 'error', message: 'Dữ liệu nhập vào không hợp lệ.' });
      setTimeout(() => this.hideToast(), 3000);
      return;
    }
    // check thỏa mãn điều kiện đăng nhập (giả lập) email phải là admin@gmail.com và password là admin123
    if (this.loginEmail() !== 'admin@gmail.com' || this.loginPassword() !== 'Anhpro@1234') {
      this.toast.set({ type: 'error', message: 'Đăng nhập không thành công.' });
      setTimeout(() => this.hideToast(), 3000);
      return;
    }
    else {
      this.toast.set({ type: 'success', message: 'Đăng nhập thành công!' });
      const token = AuthServicesService.prototype.createToken({ email: this.loginEmail, password: this.loginPassword }, 'nqatech', 3600);
      // lưu token vào local storage
      AuthServicesService.prototype.insertToken(token);
      setTimeout(() => this.hideToast(), 5000);
      this.router.navigate(['/dashboard']);

      // TODO: Chuyển hướng đến trang chính sau khi đăng nhập thành công
      // this.router.navigate(['/home']); // Giả sử bạn có route /dashboard
    }

    console.log('Đăng nhập với:', this.loginEmail(), this.loginPassword());
    // Giả lập thông báo thành công
    // this.toast.set({ type: 'success', message: 'Đăng nhập thành công!' });
    // Tự động ẩn sau 3s
    setTimeout(() => this.hideToast(), 3000);
  }

}
