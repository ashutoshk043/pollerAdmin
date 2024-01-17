import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { WishingscriptService } from 'src/app/services/wishingscript.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-occasional',
  templateUrl: './occasional.component.html',
  styleUrls: ['./occasional.component.css']
})
export class OccasionalComponent {
  title: string = "Occassional"
  normalScript: any
  formData = new FormData();
  scriptData: any
  btnValue = "Submit"
  scriptIdToedit:any

  constructor(private router: Router, private titleService: TitleService, private fb: FormBuilder, private wishingScript: WishingscriptService, private toster: ToastrService) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.normalScriptForm()
    this.getAllnormal()
  }

  getAllnormal() {
    this.wishingScript.getAllnormalScript({ "requestFrom": "Admin" }).subscribe((res: any) => {
      this.scriptData = res.data
    })
  }


  normalScriptForm() {
    this.normalScript = this.fb.group({
      thumbnail: ['', Validators.required],
      event: ['', Validators.required],
      eventType: ['normal', Validators.required],
      eventTheme: ['', Validators.required],
      exipryDate: ['', Validators.required],
      firstWish: ['', Validators.required],
      firstMessage: ['', Validators.required],
      secondMessage: ['', Validators.required],
      mp3File: [''],
      doorScript: ['', Validators.required],
      doorsImage: ['', Validators.required],
      doorrsIcon: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      firstImage:['', Validators.required],
      secondImage:['', Validators.required]

    })
  }

  resetSubmittedFormData() {
    this.formData.delete('event');
    this.formData.delete('eventType');
    this.formData.delete('eventTheme');
    this.formData.delete('exipryDate');
    this.formData.delete('firstWish');
    this.formData.delete('firstMessage');
    this.formData.delete('secondMessage');
    this.formData.delete('doorScript');
    this.formData.delete('title');
    this.formData.delete('description');
    this.formData.delete('tags');
    this.formData.delete('mp3File');
    this.formData.delete('doorsImage');
    this.formData.delete('doorrsIcon');
    this.formData.delete('thumbnail');
    this.formData.delete('_id');
  }

  submit(scriptIdToedit:any) {
    // alert(this.scriptIdToedit)
    if(this.scriptIdToedit==undefined){
    // const formValues = this.normalScript.value
    this.formData.append('event', this.normalScript.value.event);
    this.formData.append('eventType', this.normalScript.value.eventType);
    this.formData.append('eventTheme', this.normalScript.value.eventTheme);
    this.formData.append('exipryDate', this.normalScript.value.exipryDate);
    this.formData.append('firstWish', this.normalScript.value.firstWish);
    this.formData.append('firstMessage', this.normalScript.value.firstMessage);
    this.formData.append('secondMessage', this.normalScript.value.secondMessage);
    this.formData.append('doorScript', this.normalScript.value.doorScript);
    this.formData.append('title', this.normalScript.value.title);
    this.formData.append('description', this.normalScript.value.description);
    this.formData.append('tags', this.normalScript.value.tags);

    this.wishingScript.createNornalWishingScript(this.formData).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.toster.success('Poll Create Successfully...');
          this.resetSubmittedFormData()
          this.normalScript.reset()
          // this.getAllnormal()
        } else {
          this.toster.error('SomeThing errr');
          this.resetSubmittedFormData()
          this.normalScript.reset()
        }
      },
      error: (error) => {
        this.resetSubmittedFormData()
        this.normalScript.reset()
        this.toster.error('An error occurred  while creating normal Script.');
      },
    })
  }else{
    this.formData.append('_id', this.scriptIdToedit);
    this.formData.append('event', this.normalScript.value.event);
    this.formData.append('eventType', this.normalScript.value.eventType);
    this.formData.append('eventTheme', this.normalScript.value.eventTheme);
    this.formData.append('exipryDate', this.normalScript.value.exipryDate);
    this.formData.append('firstWish', this.normalScript.value.firstWish);
    this.formData.append('firstMessage', this.normalScript.value.firstMessage);
    this.formData.append('secondMessage', this.normalScript.value.secondMessage);
    this.formData.append('doorScript', this.normalScript.value.doorScript);
    this.formData.append('title', this.normalScript.value.title);
    this.formData.append('description', this.normalScript.value.description);
    this.formData.append('tags', this.normalScript.value.tags);
    // this.formData.append('inicialChartData', this.normalScript.value.inicialChartData);
    // this.formData.append('chartType', this.normalScript.value.chartType);

    this.wishingScript.updatenormalScript(this.formData).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.toster.success('Poll Updated Successfully...');
          this.resetSubmittedFormData()
          this.normalScript.reset()
          this.getAllnormal()
        } else {
          this.toster.error('SomeThing errr');
          this.resetSubmittedFormData()
          this.normalScript.reset()
        }
      },
      error: (error:any) => {
        this.resetSubmittedFormData()
        this.normalScript.reset()
        this.toster.error('An error occurred  while Updating normal Script.');
      },
    })
  }
  }


  selectMp3File(event: any) {

    if (event.target.files && event.target.files.length > 0) {
      this.formData.delete('mp3File');
      const file = event.target.files[0];
      this.formData.append('mp3File', file);
    }
  }
  // doorsImage:['', Validators.required],
  //     doorrsIcon:['',Validators.required],

  selectDoorsImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.formData.delete('doorsImage');
      const file = event.target.files[0];
      this.formData.append('doorsImage', file);
    }
  }

  selectDoorsIcon(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.formData.delete('doorrsIcon');
      const file = event.target.files[0];
      this.formData.append('doorrsIcon', file);
    }
  }
  selectThumbnail(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.formData.delete('thumbnail');
      const file = event.target.files[0];
      this.formData.append('thumbnail', file);
    }
  }
  selectfirstImageImage(event:any){
    if (event.target.files && event.target.files.length > 0) {
      this.formData.delete('firstImage');
      const file = event.target.files[0];
      this.formData.append('firstImage', file);
    }
  }

  selectsecondImageImage(event:any){
    if (event.target.files && event.target.files.length > 0) {
      this.formData.delete('secondImage');
      const file = event.target.files[0];
      this.formData.append('secondImage', file);
    }
  }

  changeStatus(status: any, id: any) {
    let changesStatus;
    if (status == 1) {
      changesStatus = 0
    } else if (status == 0) {
      changesStatus = 1
    }
    this.wishingScript.updateNormalStatus({ status: changesStatus, id: id }).subscribe((res: any) => {
      if (res.status) {
        this.toster.success("Status Updated Successfully")
        this.getAllnormal()
      } else {
        this.toster.error("something went wrong !!!!")
      }
    })
  }

  updateScript(event: any) {
    this.scriptIdToedit = event._id
    this.btnValue = "Update"
    const date = new Date(event.exipryDate);

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1.
    const day = date.getUTCDate().toString().padStart(2, '0');

    const formattedDate = year + '-' + month + '-' + day;

    this.normalScript.patchValue({
      // thumbnail:event.thumbnail,
      event: event.event,
      eventType: event.eventType,
      eventTheme: event.eventTheme,
      exipryDate: formattedDate,
      firstWish: event.firstWish,
      firstMessage: event.firstMessage,
      secondMessage: event.secondMessage,
      // mp3File:[''],
      doorScript: event.doorScript,
      // doorsImage:['', Validators.required],
      // doorrsIcon:['',Validators.required],
      title: event.title,
      description: event.description,
      tags: event.tags,
      // inicialChartData:['', Validators.required],
      chartType: event.chartType
    })
  }
}
