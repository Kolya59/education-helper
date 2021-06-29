import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IReceipt } from '../../models/receipt.model';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  public async getReceipts(): Promise<IReceipt[]> {
    return new Promise<IReceipt[]>(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: 'select * from `Квитанция`',
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
            reject(ReceiptService.checkAuthError(errResp));
          }
        );
    });
  }

  public async addReceipt(receipt: IReceipt): Promise<IReceipt> {
    return new Promise(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query:
              'insert into `Квитанция` (`Идентификатор программы`, `Сумма`, `Дата`, `Код ребенка`, `Код компании`) ' +
              `values ('${receipt['Идентификатор программы']}', '${receipt['Сумма']}', '${receipt['Дата']}', '${receipt['Код ребенка']}', '${receipt['Код компании']}')`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          () => {
            resolve(receipt);
          },
          (errResp) => {
            reject(ReceiptService.checkAuthError(errResp));
          }
        );
    });
  }

  public async updateReceipt(receipt: IReceipt): Promise<IReceipt> {
    return new Promise<IReceipt>((resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: `update \`Квитанция\` set \`Идентификатор программы\` = '${receipt['Идентификатор программы']}', \`Сумма\` = '${receipt['Сумма']}', \`Дата\` = '${receipt['Дата']}', \`Код ребенка\` = '${receipt['Код ребенка']}', \`Код компании\` = '${receipt['Код компании']}' where \`Номер квитанции\` = '${receipt['Номер квитанции']}'`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          () => {
            resolve(receipt);
          },
          (errResp) => {
            reject(ReceiptService.checkAuthError(errResp));
          }
        );
    });
  }

  public async deleteReceipt(receipt: IReceipt): Promise<IReceipt> {
    return new Promise<IReceipt>(async (resolve, reject) => {
      this.http
        .post(
          `http://localhost:8080/query`,
          {
            query: `delete from \`Квитанция\` where \`Номер квитанции\` = '${receipt['Номер квитанции']}'`,
            token: localStorage.getItem('token'),
          },
          {
            responseType: 'json',
          }
        )
        .subscribe(
          () => {
            resolve(receipt);
          },
          (errResp) => {
            reject(ReceiptService.checkAuthError(errResp));
          }
        );
    });
  }

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
    console.error('receipt error', resp);

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
