import { Component, OnInit } from '@angular/core';
import { ConstructionData } from 'src/app/interfaces/constructionData.interface';
import { ProjectDetails } from 'src/app/interfaces/projectDetails.interface';
import { SimplifiedObject } from 'src/app/interfaces/simplifiedObject.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.scss'],
})
export class SummaryViewComponent implements OnInit {

  public projectDetails: ConstructionData[] = [];
  public tableData : SimplifiedObject[] = [];

  constructor(private service: CommonService) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.service.getAllData().subscribe(
      (res) => {
        const apiResponse = res;
        this.projectDetails = res.Datas;
        console.log(this.projectDetails);
        this.mappingFunction(this.projectDetails);
      },
      (err) => {
        console.warn(err);
      },
      () => {
        console.log('getAllData api called');
      }
    );
  }

  //simplifying nested json to a custom simple object
  mappingFunction(projectDetailsArray: ConstructionData[]) {
    
    projectDetailsArray.forEach((x) => {

      const simplifiedObject: SimplifiedObject = {
        SamplingTime: x.SamplingTime,
      };

      x.Properties.forEach((x) => {
        simplifiedObject[x.Label] = x.Value
      })

      //filling tabledata variable
      this.tableData.push(simplifiedObject);
    });

    console.log('simplifiedArray =>' , this.tableData);

    //updating list stream for list-view
    this.service.setProjectDetailsDataList(this.tableData);
  }
}
