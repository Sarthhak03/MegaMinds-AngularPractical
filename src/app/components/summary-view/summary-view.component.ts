import { Component, OnInit } from '@angular/core';
import { ProjectDetails } from 'src/app/interfaces/projectDetails.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.scss'],
})
export class SummaryViewComponent implements OnInit {
  public projectDetails: ProjectDetails[] = [];

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
      },
      (err) => {
        console.warn(err);
      },
      () => {
        console.log('getAllData api called');
      }
    );
  }
}
