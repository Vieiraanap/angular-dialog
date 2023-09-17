import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  mockRequest(data: boolean, options: ResponseInit, sleep = 200) {
    const response = new Response(JSON.stringify(data), options);

    return new Observable((subscriber) => {
      setTimeout(() => {
        options.status < 400 ? subscriber.next(response) : subscriber.error(response);
      }, sleep);
    });
  }

}
