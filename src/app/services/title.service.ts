import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private titleSubject = new BehaviorSubject<string>('Default Title');
  title$: Observable<string> = this.titleSubject.asObservable();


  setTitle(title: string) {
    this.titleSubject.next(title);
  }  

}
