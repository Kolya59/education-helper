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
      let students: IStudent[] = [];
      try {
        students = await new Promise<IStudent[]>((resolve) => {
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
            .subscribe((resp: any) => {
              resolve(resp.result);
            });
        });
      } catch (err) {
        StudentService.checkAuthError(err);
        reject(err);
      }

      resolve(students);
    });
  }

  public async addStudent(student: IStudent): Promise<IStudent> {
    return new Promise(async (resolve, reject) => {
      try {
        await new Promise<void>((resolve) => {
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
            .subscribe(() => {
              resolve();
            });
        });
      } catch (err) {
        StudentService.checkAuthError(err);
        reject(err);
      }

      resolve(student);
    });
  }

  public async updateStudent(student: IStudent): Promise<IStudent> {
    return new Promise<IStudent>(async (resolve, reject) => {
      try {
        await new Promise<void>((resolve) => {
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
            .subscribe(() => {
              resolve();
            });
        });
      } catch (err) {
        StudentService.checkAuthError(err);
        reject(err);
      }

      resolve(student);
    });
  }

  public async deleteStudent(student: IStudent): Promise<IStudent> {
    return new Promise<IStudent>(async (resolve, reject) => {
      try {
        await new Promise<void>((resolve) => {
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
            .subscribe(() => {
              resolve();
            });
        });
      } catch (err) {
        StudentService.checkAuthError(err);
        reject(err);
      }

      resolve(student);
    });
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
