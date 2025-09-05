import { ICountryUser } from "./icountry";

export interface Iuser {
    id:       string;
    name:     string;
    lastName: string;
    email:    string;
    password: string;
    country:  ICountryUser;
}