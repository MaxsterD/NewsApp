import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryApiResponse, ICountry, ICountrySelect } from 'src/app/interfaces/icountry';
import { Iuser } from 'src/app/interfaces/iuser';
import { Toast } from 'src/app/providers/toast/toast';
import { Auth } from 'src/app/service/auth/auth';
import { HttpService } from 'src/app/service/http/http-service';
import { User } from 'src/app/service/user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  countries: ICountrySelect[] = [];
  buttonText: string = "Register";
  profileForm!: FormGroup;
  isSubmitting = false;
  currentUser: Iuser | null = null;

  constructor(
    private formController: FormBuilder, 
    private toast: Toast, 
    private router: Router,
    private httpService: HttpService,
    private userService: User,
    private authService: Auth) {}
  
  
  async ngOnInit() {

    this.profileForm = this.formController.group({
      id: [''],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      country: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

    const url = 'https://countriesnow.space/api/v0.1/countries/flag/unicode';
    
    try {
      const res = await this.httpService.get<CountryApiResponse>(url);

      this.countries = res.data.map(c => ({
        ...c,
        nameCode: `${c.unicodeFlag} ${c.name}`
      }));


      console.log('Countries:', this.countries);
    } catch (err) {
      console.error('Error fetching countries', err);
    }
    
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.buttonText = "Update";
      this.profileForm.patchValue({
        id: this.currentUser.id,
        name: this.currentUser.name,
        lastName: this.currentUser.lastName,
        country: this.currentUser.country,
        email: this.currentUser.email,
        //password: this.currentUser.password, 
        //confirmPassword: this.currentUser.password,
      });
    }

  }

  async onSubmit() {
    this.isSubmitting = true;
    console.log('Datos profile:', this.profileForm.value);

    const password = this.profileForm.get('password')?.value;
    const confirmPassword = this.profileForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.toast.show('Las contraseñas no coinciden', 'danger');
      this.isSubmitting = false;
      return;
    }

    try {
      await new Promise(r => setTimeout(r, 2000));

      const user: Iuser = {
        id: this.currentUser ? this.currentUser.id : '',
        name: this.profileForm.get('name')?.value,
        lastName: this.profileForm.get('lastName')?.value,
        email: this.profileForm.get('email')?.value,
        password: password,
        country: this.profileForm.get('country')?.value,
      };

      if (this.currentUser) {
        const users: Iuser[] = this.userService.getAllUsers() || [];

        const exists = users.some(
          u => u.email === user.email && u.id !== this.currentUser?.id
        );

        if (exists) {
          this.toast.show('Ese correo ya está en uso', 'danger');
          this.isSubmitting = false;
          return;
        }

        const updated = this.userService.updateUser(user);

        if (updated) {
          this.toast.show('Perfil actualizado', 'success');
          this.router.navigate(['/home']);
        } else {
          this.toast.show('Error al actualizar', 'danger');
        }
      }else{
        const users: Iuser[] = this.userService.getAllUsers() || [];
        const exists = users.some(u => u.email === user.email);

        if (exists) {
          this.toast.show('El correo ya está registrado', 'danger');
          return;
        }

        const res = this.userService.register(user);

        this.toast.show('Registro exitoso', 'success');
        console.log("Registrado1:", res);
        console.log("Registrado:", user);

        this.profileForm.reset();

        this.router.navigate(['/login']);
      }

    } catch (error) {
      console.error("Error en registro", error);
      this.toast.show('Error en registro ❌', 'danger');
    } finally {
      this.isSubmitting = false;
    }
  }

  onCountrySelected(country: ICountrySelect) {
    this.profileForm.patchValue({
      country: {
        id: country.name,
        value: country.nameCode
      }
    });
    console.log('Selected country:', this.profileForm.value.country);
  }

}
