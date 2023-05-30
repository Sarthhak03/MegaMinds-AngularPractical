import { ChangeDetectionStrategy , ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstructionData } from 'src/app/interfaces/constructionData.interface';
import { SimplifiedObject } from 'src/app/interfaces/simplifiedObject.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListViewComponent implements OnInit {

  public projectDataList$: Observable<SimplifiedObject[]>;
  public isRefreshView: Observable<boolean>;
  
  constructor(
    private service: CommonService,
    private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.projectDataList$ = this.service.getProjectDetailsDataList();
    this.isRefreshView = this.service.getRefreshView();
    if(this.isRefreshView){
      this.updateList();
      this._cd.markForCheck();
    }
  }

  updateList(){
    this.service.getAllData().subscribe(
      (res) => {
        const projectDetails = res.Datas;
        this.mappingFunction(projectDetails);
      },
      (err) => {
        console.warn(err);
      },
      () => {
        console.log('getAllData api called');
      }
    );
  }

  mappingFunction(projectDetailsArray: ConstructionData[]) {
    const updatedListData : SimplifiedObject[] = [];

    projectDetailsArray.forEach((x) => {

      const simplifiedObject: SimplifiedObject = {
        SamplingTime: x.SamplingTime,
      };

      x.Properties.forEach((x) => {
        simplifiedObject[x.Label] = x.Value
      })

      //filling updatedListData
      updatedListData.push(simplifiedObject);
    });

    //updating list stream for list-view
    this.service.setProjectDetailsDataList(updatedListData);
  }

}
