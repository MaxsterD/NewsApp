import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryApiResponse, ICountry, ICountrySelect } from 'src/app/interfaces/icountry';
import { Toast } from 'src/app/providers/toast/toast';
import { HttpService } from 'src/app/service/http/http-service';

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
  customPopoverOptions = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color',
  };

  constructor(private formController: FormBuilder, private toast: Toast, private router: Router,private httpService: HttpService) {}
  
  
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

  onCountrySelected(event: any) {
    const country: ICountrySelect = event.detail?.value; // <-- extraemos el valor real
    
    this.profileForm.patchValue({
      country: {
        id: country.name,
        value: country.nameCode
      }
    });
    console.log('Selected country:', this.profileForm.value.country);
  }

}
