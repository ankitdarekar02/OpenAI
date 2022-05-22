import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenAPIService } from '../../services/open-api.service';

@Component({
  selector: 'prompt-box',
  templateUrl: './prompt-box.component.html',
  styleUrls: ['./prompt-box.component.scss']
})
export class PromptBoxComponent implements OnInit {

  form: FormGroup = this.fb.group({
    prompt: [null],
    engine:['text-curie-001']
  });

  responseText:any;
  showLoader:boolean = false;
  responseList:any = [];
  engineList:any = ['text-curie-001', 'text-davinci-002', 'text-babbage-001', 'text-ada-001'];

  deleteResponse(index: any) {
    this.responseList.splice(index, 1); 
    localStorage.setItem('responseCache', JSON.stringify(this.responseList));
  }

  onSubmit() {
    const prompt = this.form.value['prompt'];
    const engine = this.form.value['engine'];
    this.showLoader = true;
    this.service.getPrompts(prompt, engine).then((response: any)=> { 
      if(response.data && response.data.choices[0]) {
        this.responseList.push({
          heading: prompt,
          response: response.data.choices[0].text
        });
      };
      this.responseList = this.responseList.reverse();
      this.showLoader = false;
      localStorage.setItem('responseCache', JSON.stringify(this.responseList));
    });
    this.form.controls['prompt'].reset();
  }
  
  constructor(private fb: FormBuilder,private service: OpenAPIService) { }

  ngOnInit(): void {
    if(localStorage.responseCache) {
      this.responseList = JSON.parse(localStorage.responseCache);
    }
  }

}
