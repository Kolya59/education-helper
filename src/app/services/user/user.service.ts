import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  public async getUser(): Promise<IUser> {
    return new Promise<IUser>(async (resolve, reject) => {
      try {
        let user = await new Promise<IUser>((resolve) => {
          this.http
            .post(
              `http://localhost:8080/query`,
              {
                query: 'select user() as username',
                token: localStorage.getItem('token'),
              },
              {
                responseType: 'json',
              }
            )
            .subscribe((resp: any) => {
              let name = resp.result[0].username;
              this.http
                .post(
                  `http://localhost:8080/query`,
                  {
                    query: `show grants for ${name}`,
                    token: localStorage.getItem('token'),
                  },
                  {
                    responseType: 'json',
                  }
                )
                .subscribe((resp: any) => {
                  let role = '';
                  for (let grant of resp.result) {
                    Object.entries(grant).forEach(([key, value]) => {
                      if (typeof value != 'string') {
                        return;
                      }

                      if (value.slice(0, 13) == `GRANT \`admin\``) {
                        role = 'admin';
                      }

                      if (value.slice(0, 16) == `GRANT \`director\``) {
                        role = 'director';
                      }
                    });
                  }
                  if (role == '') {
                    reject(InvalidCredentialsError);
                  }
                  resolve({
                    name,
                    role,
                    status: true,
                  });
                });
            });
        });
        resolve(user);
      } catch (err) {
        UserService.checkAuthError(err);
        reject(err);
      }
    });
  }

  public checkAuthStatus(): boolean {
    return this.cookieService.check('token');
  }

  private static checkAuthError(resp: HttpErrorResponse) {
    if (resp.status == 401) {
      throw MissingCredentialsError;
    }

    if (resp.status == 403) {
      throw InvalidCredentialsError;
    }
  }
}

export class MissingCredentialsError extends Error {}

export class InvalidCredentialsError extends Error {}
