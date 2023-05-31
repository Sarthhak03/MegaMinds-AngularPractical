import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SimplifiedObject } from '../interfaces/simplifiedObject.interface';
import { ConstructionData } from '../interfaces/constructionData.interface';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public projectDetailsDataList$: BehaviorSubject<SimplifiedObject[]>;
  public refreshView$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.projectDetailsDataList$ = new BehaviorSubject<any[]>([]);
    this.refreshView$ = new BehaviorSubject<boolean>(false);
  }

  //getter & setter methods for B.subject
  getProjectDetailsDataList(): Observable<SimplifiedObject[]> {
    return this.projectDetailsDataList$.asObservable();
  }

  setProjectDetailsDataList(value: SimplifiedObject[]) {
    this.projectDetailsDataList$.next(value);
  }

  //getter & setter methods for refreshView
  getRefreshView(): Observable<boolean> {
    return this.refreshView$.asObservable();
  }

  setRefreshView(value: boolean) {
    this.refreshView$.next(value);
  }

  //fetch data
  getAllData(): Observable<any> {
    return this.http.get<any>('assets/data.json');
  }

  //saving all data
  saveAllData(updatedData) {
    // const filePath = '/src/assets/data.json';
    // this.http.put(filePath, updatedData).subscribe(() => {
    //   console.log('Data saved successfully!');
    //   this.refreshView$.next(true);
    // });

    const blob = new Blob([updatedData], { type: 'application/json' });
    saveAs(blob, 'data.json');
    this.refreshView$.next(true);
    console.log('Data saved successfully!');
  }
}
