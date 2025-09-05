import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from 'src/app/providers/toast/toast';
import { Auth } from 'src/app/service/auth/auth';
import { Loader } from 'src/app/service/loader/loader';
import { User } from 'src/app/service/user/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  
  loginForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private formController: FormBuilder,
    private toast: Toast,
    private router: Router,
    private userService: User,
    private authService: Auth,
    private loader: Loader) {}
  ngOnInit() {
    this.loginForm = this.formController.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    this.isSubmitting = true;
    const { email, password } = this.loginForm.value;

    try {
      const user = this.userService.login(email, password);

      if (!user) {
        this.toast.show('Correo o contraseña incorrectos', 'danger');
        return;
      }

      this.authService.setCurrentUser(user);

      this.toast.show(`Bienvenido ${user.name} `, 'success');
      console.log("Usuario logueado:", user);
      await this.loader.show('Loading...');
      
      this.router.navigate(['/home']).then(() => {
          setTimeout(() => this.loader.hide(), 500);
      });
      
    } finally {
      this.isSubmitting = false;
    }
  }
    
    async goRegister() {
      await this.loader.show('Loading...');
      
      this.router.navigate(['/profile/register']).then(() => {
          setTimeout(() => this.loader.hide(), 500);
      });
    }
  }
