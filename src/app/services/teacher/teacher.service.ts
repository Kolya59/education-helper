import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ITeacher } from '../../models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  public async getTeachers(): Promise<ITeacher[]> {
    return new Promise<ITeacher[]>(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: 'select * from `Преподаватели`',
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          (resp: any) => {
            resolve(resp.result);
          },
          (errResp) => {
            reject(TeacherService.checkAuthError(errResp));
          }
        );
    });
  }

  public async addTeacher(teacher: ITeacher): Promise<ITeacher> {
    return new Promise(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query:
              'insert into `Преподаватели` (`Фамилия`, `Имя`, `Отчество`, `Стаж в образовательной деятельности`, `Квалификация`) ' +
              `values ('${teacher['Фамилия']}', '${teacher['Имя']}', '${teacher['Отчество']}', '${teacher['Стаж в образовательной деятельности']}', '${teacher['Квалификация']}')`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          () => {
            resolve(teacher);
          },
          (errResp) => {
            reject(TeacherService.checkAuthError(errResp));
          }
        );
    });
  }

  public async updateTeacher(teacher: ITeacher): Promise<ITeacher> {
    return new Promise<ITeacher>((resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: `update \`Преподаватели\` set \`Фамилия\` = '${teacher['Фамилия']}', \`Имя\` = '${teacher['Имя']}', \`Отчество\` = '${teacher['Отчество']}', \`Стаж в образовательной деятельности\` = '${teacher['Стаж в образовательной деятельности']}', \`Квалификация\` = '${teacher['Квалификация']}' where \`Табельный номер\` = '${teacher['Табельный номер']}'`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          () => {
            resolve(teacher);
          },
          (errResp) => {
            reject(TeacherService.checkAuthError(errResp));
          }
        );
    });
  }

  public async deleteTeacher(teacher: ITeacher): Promise<ITeacher> {
    return new Promise<ITeacher>(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: `delete from \`Преподаватели\` where \`Табельный номер\` = '${teacher['Табельный номер']}'`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          () => {
            resolve(teacher);
          },
          (errResp) => {
            reject(TeacherService.checkAuthError(errResp));
          }
        );
    });
  }

  private static checkAuthError(resp: HttpErrorResponse) {
    console.error('teacher error', resp);

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
