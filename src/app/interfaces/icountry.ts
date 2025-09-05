export interface ICountry {
  name: string
  iso2: string
  iso3: string
  unicodeFlag: string
}

export interface ICountryUser {
  id: string
  value: string
}

export interface CountryApiResponse {
  error: boolean;
  msg: string;
  data: ICountry[];
}

export interface ICountrySelect {
  name: string
  iso2: string
  iso3: string
  unicodeFlag: string
  nameCode: string
}