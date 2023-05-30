import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SimplifiedObject } from 'src/app/interfaces/simplifiedObject.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  public projectDataList$: Observable<SimplifiedObject[]>;
  
  constructor(private service: CommonService) { }

  ngOnInit(): void {
    this.projectDataList$ = this.service.getProjectDetailsDataList();
  }

}
