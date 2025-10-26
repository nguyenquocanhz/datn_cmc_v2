import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServicesService } from '../Helpers/auth-services.service';

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
  constructor(private router: Router) { }
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
      const authService = new AuthServicesService();
      const token = authService.getToken();
      if (!token) {
        // Chuyển hướng về trang đăng nhập nếu không có token
        this.router.navigate(['/login']);
      }
    }
  }


  /**
   * Xử lý sự kiện đăng xuất
   */
  handleLogout(event: Event) {
    event.preventDefault(); // Ngăn link # chạy
    const authSevice = new AuthServicesService();
    authSevice.removeToken();
    console.log("Người dùng đã đăng xuất.");

    // Trong ứng dụng thực tế, bạn sẽ dùng Router để điều hướng:
    this.router.navigate(['/login']); 
  }
}
