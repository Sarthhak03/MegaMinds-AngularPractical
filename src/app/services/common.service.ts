import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SimplifiedObject } from '../interfaces/simplifiedObject.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public projectDetailsDataList$: BehaviorSubject<SimplifiedObject[]>;

  constructor(private http: HttpClient) {
    this.projectDetailsDataList$ = new BehaviorSubject<any[]>([]);
  }

  //getter & setter methods for B.subject

  getProjectDetailsDataList(): Observable<SimplifiedObject[]> {
    return this.projectDetailsDataList$.asObservable();
  }

  setProjectDetailsDataList( value : SimplifiedObject[]){
    this.projectDetailsDataList$.next(value);
  }

  //fetch data
  getAllData(): Observable<any> {
    return this.http.get<any>('assets/data.json');
  }
}
