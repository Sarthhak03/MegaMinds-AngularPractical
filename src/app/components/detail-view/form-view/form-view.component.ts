import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstructionData } from 'src/app/interfaces/constructionData.interface';
import { ConstructionProperty } from 'src/app/interfaces/constructionProperty.interface';
import { ProjectDetails } from 'src/app/interfaces/projectDetails.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss'],
})
export class FormViewComponent implements OnInit {
  public projectDetailForm: FormGroup;

  constructor(private _fb: FormBuilder, private service: CommonService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.projectDetailForm = this._fb.group({
      projectName: ['', Validators.maxLength(100)],
      constructionCount: [null],
      isConstructionCompleted: [false],
      lengthOfRoad: [null],
    });
  }

  onSave() {
    const form = this.projectDetailForm.value;
    console.log(form);

    //Since the JSON file is stored locally in our project, we will need to update it manually;
    //step 1 : Getting all the data
    this.service.getAllData().subscribe((res) => {
      const apiResponse = res;

      //step 2 : updating the data
      let newEntry = new Object();

      const currentTimeStamp = new Date().toISOString();
      newEntry['SamplingTime'] = currentTimeStamp;

      //reverse mapping to original complex form
      const properties = Object.keys(form).map((key) => {
        {
          const label = this.getPropertyLabel(key);
          return {
            Value: form[key],
            Label: label,
          };
        }
      });

      newEntry['Properties'] = properties;

      //pushing newEntry in the original Json data
      apiResponse.Datas.push(newEntry);

      //Since the JSON file is static, we have to update the JSON file manually.
      const updatedData = JSON.stringify(apiResponse);
      this.service.saveAllData(updatedData);

    });

    this.projectDetailForm.reset();
  }

  getPropertyLabel(key) {
    const labelMapping = {
      projectName: 'Project Name',
      constructionCount: 'Construction Count',
      isConstructionCompleted: 'Is Construction Completed',
      lengthOfRoad: 'Length of the road',
    };

    return labelMapping[key] || '';
  }
}
