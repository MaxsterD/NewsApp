import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  async get<T>(
    url: string,
    headers?: { [key: string]: string },
    params?: { [key: string]: string }
  ): Promise<T> {

    const httpHeaders = headers ? new HttpHeaders(headers) : undefined;

    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return await firstValueFrom(
      this.http.get<T>(url, {
        headers: httpHeaders,
        params: params ? httpParams : undefined
      })
    );
  }
}
