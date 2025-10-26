import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) { }
    // Sử dụng signal cho state
  isMobileMenuOpen = signal(false);
  isProfileDropdownOpen = signal(false);
  get isAuthPage(): boolean {
    const url = this.router.url;
    // Nếu URL chứa bất kỳ chuỗi nào trong đây, ta xem nó là trang auth
    return url.includes('/login') || url.includes('/register') || url.includes('/forgot');
  }
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
  // Func Logout
  async handleLogout(event: Event) {
    const authService = new (await import('./Helpers/auth-services.service')).AuthServicesService();
    authService.removeToken();
    this.router.navigate(['/login']);
  }
}
