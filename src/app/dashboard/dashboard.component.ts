import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLinkActive , RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // Sử dụng signal cho state
  isMobileMenuOpen = signal(false);
  isProfileDropdownOpen = signal(false);

  // --- Logic cho Mobile Menu ---
  toggleMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }

  // --- Logic cho Profile Dropdown ---
  toggleProfileDropdown(event: Event) {
    event.stopPropagation(); // Ngăn sự kiện click lan ra window
    this.isProfileDropdownOpen.update(value => !value);
  }

  // Đóng dropdown khi click ra bên ngoài
  @HostListener('window:click')
  onWindowClick() {
    if (this.isProfileDropdownOpen()) {
      this.isProfileDropdownOpen.set(false);
    }
  }

  // --- (MỚI) Logic xử lý JWT Token ---

  /**
   * Khởi chạy component, kiểm tra token
   */
  ngOnInit() {
    // Chỉ chạy ở phía client (browser)
    if (typeof window !== 'undefined' && window.localStorage) {
      this.kiemTraVaKhoiTaoToken();
    }
  }

  /**
   * Giả lập việc nhận token từ backend và lưu vào localStorage.
   * @param {string} token - Chuỗi JWT token nhận được.
   */
  luuTokenVaoLocalStorage(token: string) {
    console.log("Đã nhận và lưu token vào localStorage.");
    localStorage.setItem('jwtToken', token);
  }

  /**
   * Lấy token từ localStorage.
   * @returns {string|null} - Trả về token nếu có, hoặc null nếu không.
   */
  layTokenTuLocalStorage(): string | null {
    return localStorage.getItem('jwtToken');
  }

  /**
   * Xóa token khỏi localStorage (dùng cho chức năng đăng xuất).
   */
  xoaTokenKhoiLocalStorage() {
    console.log("Đã xóa token khỏi localStorage.");
    localStorage.removeItem('jwtToken');
  }

  /**
   * Kiểm tra xem token đã tồn tại hay chưa.
   * Trong ví dụ này, nếu chưa có, chúng ta sẽ giả lập tạo mới.
   */
  kiemTraVaKhoiTaoToken() {
    const tokenHienTai = this.layTokenTuLocalStorage();

    if (!tokenHienTai) {
      console.log("Chưa có token. Giả lập đăng nhập và tạo token mới.");
      // Đây là một token JWT giả lập để demo
      const tokenGiaLap = "eyJhbGciOiJIZDI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhdmlzIExldmluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      this.luuTokenVaoLocalStorage(tokenGiaLap);
    } else {
      console.log("Đã tìm thấy token:", tokenHienTai);
      // Ở đây, bạn có thể thêm logic để xác thực token với backend
    }
  }

  /**
   * Xử lý sự kiện đăng xuất
   */
  handleLogout(event: Event) {
    event.preventDefault(); // Ngăn link # chạy
    this.xoaTokenKhoiLocalStorage();
    console.log("Đã đăng xuất! Cần chuyển hướng về trang đăng nhập.");

    // Tạm thời reload trang để thấy token đã mất (cho demo)
    location.reload();

    // Trong ứng dụng thực tế, bạn sẽ dùng Router để điều hướng:
    // this.router.navigate(['/login']); 
  }
}
