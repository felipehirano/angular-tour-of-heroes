import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Injectable()
export class LogHelper {
  constructor(private messageService: MessageService) {}

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
