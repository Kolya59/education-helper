import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IStudent } from '../../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  public async getStudents(): Promise<IStudent[]> {
    return new Promise<IStudent[]>(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: 'select * from `Обучающиеся`',
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
            reject(StudentService.checkAuthError(errResp));
          }
        );
    });
  }

  public async addStudent(student: IStudent): Promise<IStudent> {
    return new Promise(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query:
              'insert into `Обучающиеся` (`Фамилия ребенка`, `Имя ребенка`, `Дата рождения`, `Имя отчество родителя`, `Контактный телефон`) ' +
              `values ('${student['Фамилия ребенка']}', '${student['Имя ребенка']}', '${student['Дата рождения']}', '${student['Имя отчество родителя']}', '${student['Контактный телефон']}')`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          () => {
            resolve(student);
          },
          (errResp) => {
            reject(StudentService.checkAuthError(errResp));
          }
        );
    });
  }

  public async updateStudent(student: IStudent): Promise<IStudent> {
    return new Promise<IStudent>((resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: `update \`Обучающиеся\` set \`Фамилия ребенка\` = '${student['Фамилия ребенка']}' and \`Имя ребенка\` = '${student['Имя ребенка']}' and \`Дата рождения\` = '${student['Дата рождения']}' and \`Имя отчество родителя\` = '${student['Имя отчество родителя']}' and \`Контактный телефон\` = '${student['Контактный телефон']}' where \`Код ребенка\` = '${student['Код ребенка']}'`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          () => {
            resolve(student);
          },
          (errResp) => {
            reject(StudentService.checkAuthError(errResp));
          }
        );
    });
  }

  public async deleteStudent(student: IStudent): Promise<IStudent> {
    return new Promise<IStudent>(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: `delete from \`Обучающиеся\` where \`Код ребенка\` = '${student['Код ребенка']}'`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          () => {
            resolve(student);
          },
          (errResp) => {
            reject(StudentService.checkAuthError(errResp));
          }
        );
    });
  }

  private static checkAuthError(resp: HttpErrorResponse) {
    console.error('user error', resp);

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
