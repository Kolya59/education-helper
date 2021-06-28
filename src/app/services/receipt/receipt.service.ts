import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProgram } from '../../models/program.model';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  public async getRevenue(
    id: string,
    from: string,
    to: string
  ): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: `call get_revenue_education_program(${id}, \'${from}\', \'${to}\')`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          (resp: any) => {
            resolve(resp.result[0]['SUM(r.Сумма)']);
          },
          (errResp) => {
            reject(ReceiptService.checkAuthError(errResp));
          }
        );
    });
  }

  private static checkAuthError(resp: HttpErrorResponse) {
    console.error('program error', resp);

    if (resp.status == 401) {
      return MissingCredentialsError;
    }

    if (resp.status == 403) {
      return InvalidCredentialsError;
    }

    return resp.error.err;
  }
}

export class MissingCredentialsError extends Error {}

export class InvalidCredentialsError extends Error {}
