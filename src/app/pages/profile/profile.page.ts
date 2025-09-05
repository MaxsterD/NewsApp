import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryApiResponse, ICountry, ICountrySelect } from 'src/app/interfaces/icountry';
import { Iuser } from 'src/app/interfaces/iuser';
import { Toast } from 'src/app/providers/toast/toast';
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
  nameCountry: string = "";
  profileForm!: FormGroup;
  isSubmitting = false;

  customPopoverOptions = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color',
  };

  constructor(private formController: FormBuilder, private toast: Toast, private router: Router,private httpService: HttpService,private userService: User) {}
  
  
  async ngOnInit() {

    this.profileForm = this.formController.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      country: ['', [Validators.required]], // <-- null inicialmente
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
    
  }

  async onSubmit() {
    this.isSubmitting = true;
    console.log('Datos profile:', this.profileForm.value);

    const password = this.profileForm.get('password')?.value;
    const confirmPassword = this.profileForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.toast.show('Las contraseñas no coinciden ❌', 'danger');
      this.isSubmitting = false;
      return;
    }

    try {
      await new Promise(r => setTimeout(r, 2000));

      const user: Iuser = {
        id: '', // se generará en register
        name: this.profileForm.get('name')?.value,
        lastName: this.profileForm.get('lastName')?.value,
        email: this.profileForm.get('email')?.value,
        password: password,
        country: this.profileForm.get('country')?.value,
      };

      const res = this.userService.register(user);

      this.toast.show('Registro exitoso ✅', 'success');
      console.log("Registrado1:", res);
      console.log("Registrado:", user);

      this.profileForm.reset();

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
