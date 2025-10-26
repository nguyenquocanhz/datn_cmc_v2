import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar-mobile',
  imports: [],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.css'
})
export class SidebarMobileComponent {
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
}
