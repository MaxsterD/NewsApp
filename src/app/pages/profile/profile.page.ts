import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryApiResponse, ICountry, ICountrySelect } from 'src/app/interfaces/icountry';
import { Iuser } from 'src/app/interfaces/iuser';
import { Toast } from 'src/app/providers/toast/toast';
import { Auth } from 'src/app/service/auth/auth';
import { HttpService } from 'src/app/providers/http/http-service';
import { Loader } from 'src/app/providers/loader/loader';
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
    private authService: Auth,
    private loader: Loader) {}
  
  
  async ngOnInit() {

    
    this.profileForm = this.formController.group({
      id: [''],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      country: [null, [Validators.required]], 
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
      })).sort((a, b) => a.name.localeCompare(b.name));


      console.log('Countries:', this.countries);
    } catch (err) {
      console.error('Error fetching countries', err);
    }
    
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      
      const selectedCountry = this.countries.find(
        c => c.nameCode === this.currentUser?.country?.value
      );
      this.buttonText = "Update";
      this.profileForm.patchValue({
        id: this.currentUser.id,
        name: this.currentUser.name,
        lastName: this.currentUser.lastName,
        country: selectedCountry || null,
        email: this.currentUser.email,
        //password: this.currentUser.password, 
        //confirmPassword: this.currentUser.password,
      });
    }
  }

  async onSubmit() {
    this.isSubmitting = true;

    const password = this.profileForm.get('password')?.value;
    const confirmPassword = this.profileForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.toast.show('Password mismatch', 'danger');
      this.isSubmitting = false;
      return;
    }

    try {
      await new Promise(r => setTimeout(r, 2000));
      
      const selectedCountry: ICountry = this.profileForm.get('country')?.value;

      const countryToSave = {
            id: selectedCountry.name,
            value: selectedCountry.unicodeFlag + ' ' + selectedCountry.name
          };

      const user: Iuser = {
        id: this.currentUser ? this.currentUser.id : '',
        name: this.profileForm.get('name')?.value,
        lastName: this.profileForm.get('lastName')?.value,
        email: this.profileForm.get('email')?.value,
        password: password,
        country: countryToSave,
      };

      if (this.currentUser) {
        const users: Iuser[] = this.userService.getAllUsers() || [];

        const exists = users.some(
          u => u.email === user.email && u.id !== this.currentUser?.id
        );

        if (exists) {
          this.toast.show('This email already exists!', 'danger');
          this.isSubmitting = false;
          return;
        }

        const updated = this.userService.updateUser(user);

        if (updated) {
          this.authService.setCurrentUser(user);
          this.toast.show('Profile updated', 'success');
          await this.loader.show('Loading...');
          
          this.router.navigate(['/home']).then(() => {
            setTimeout(() => this.loader.hide(), 500);
          });
        } else {
          this.toast.show('Error updating', 'danger');
        }
      }else{
        const users: Iuser[] = this.userService.getAllUsers() || [];
        const exists = users.some(u => u.email === user.email);

        if (exists) {
          this.toast.show('This email already exists!', 'danger');
          return;
        }

        const res = this.userService.register(user);

        this.toast.show('Sign-up successful!', 'success');

        this.profileForm.reset();
        await this.loader.show('Loading...');
        
        this.router.navigate(['/login']).then(() => {
          setTimeout(() => this.loader.hide(), 500);
        });
      }

    } catch (error) {
      this.toast.show('Error Sign-up', 'danger');
    } finally {
      this.isSubmitting = false;
    }
  }

  public async goHome(){
    await this.loader.show('Loading...');
    
    this.router.navigate(['/home']).then(() => {
      setTimeout(() => this.loader.hide(), 500);
    });
  }
}
