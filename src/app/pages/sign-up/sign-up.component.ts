import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  hide = true;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,

  ) {}

  signupForm = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    username: ['', Validators.required],
    birthday: ['', Validators.required],
  })

  onSignUp() {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe({
        next: (res: HttpResponse<any>) => {
          if (res.status === 200) {
            this.showSuccess();
            this.router.navigate(['/home'])
          }
        },
        error: (err) => {
          this.showError(err.error);
        }
      })
    } else {
      console.warn('Invalid')
    }
    
  }

  getErrorMessage(formControl: FormControl) {
    if(formControl.hasError('required')) {
      return 'Không được để trống'
    } 

    return formControl.hasError('email') ? 'Email không hợp lệ' : '';

    // if (this.email.hasError('required')) {
    //   return 'Không được để trống';
    // }

    // return this.email.hasError('email') ? 'Email không hợp lệ' : '';
  }

  showError(message: string) {
    this.toast.error({ detail: "Lỗi", summary: message, duration: 2000 })
  }

  showSuccess() {
    this.toast.success({ detail: "Thành công", summary: "Đăng ký thành công", duration: 2000})
  }
}


