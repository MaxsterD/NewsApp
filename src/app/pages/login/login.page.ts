import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from 'src/app/providers/toast/toast';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  
  loginForm!: FormGroup;
  passwordVisible = false;

  constructor(private formController: FormBuilder, private toast: Toast, private router: Router) {}
  ngOnInit() {
    this.loginForm = this.formController.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    console.log('Datos login:', this.loginForm.value);
    this.toast.show('Login exitoso ✅','success');
  }

  goRegister() {
    this.router.navigate(['/profile']);
  }
}
