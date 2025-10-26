import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-forgot',
  imports: [],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {
   email = signal('');

  btnForgot(event: Event) {
    event.preventDefault();
    const emailValue = this.email();
    // Xử lý logic gửi link khôi phục mật khẩu đến email
    // import { AuthServicesService } from '../../Helpers/auth-services.service';
  }
} 
