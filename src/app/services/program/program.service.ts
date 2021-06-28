import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProgram } from '../../models/program.model';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  public async getPrograms(): Promise<IProgram[]> {
    return new Promise<IProgram[]>(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: 'select * from `Программы обучения`',
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
            reject(ProgramService.checkAuthError(errResp));
          }
        );
    });
  }

  public async addProgram(program: IProgram): Promise<IProgram> {
    return new Promise(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query:
              'insert into `Программы обучения` (`Название программы`, `Стоимость за месяц`, `Табельный номер преподавателя`, `Возрастная категория детей`) ' +
              `values ('${program['Название программы']}', '${program['Стоимость за месяц']}', '${program['Табельный номер преподавателя']}', '${program['Возрастная категория детей']}')`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          () => {
            resolve(program);
          },
          (errResp) => {
            reject(ProgramService.checkAuthError(errResp));
          }
        );
    });
  }

  public async updateProgram(program: IProgram): Promise<IProgram> {
    return new Promise<IProgram>((resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: `update \`Программы обучения\` set \`Название программы\` = '${program['Название программы']}' and \`Стоимость за месяц\` = '${program['Стоимость за месяц']}' and \`Табельный номер преподавателя\` = '${program['Табельный номер преподавателя']}' and \`Возрастная категория детей\` = '${program['Возрастная категория детей']}' where \`Идентификатор программы\` = '${program['Идентификатор программы']}'`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          () => {
            resolve(program);
          },
          (errResp) => {
            reject(ProgramService.checkAuthError(errResp));
          }
        );
    });
  }

  public async deleteProgram(program: IProgram): Promise<IProgram> {
    return new Promise<IProgram>(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: `delete from \`Программы обучения\` where \`Идентификатор программы\` = '${program['Идентификатор программы']}'`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          () => {
            resolve(program);
          },
          (errResp) => {
            reject(ProgramService.checkAuthError(errResp));
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
