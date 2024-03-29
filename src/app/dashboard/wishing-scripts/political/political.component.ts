import { Component } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { WishingscriptService } from 'src/app/services/wishingscript.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-political',
  templateUrl: './political.component.html',
  styleUrls: ['./political.component.css']
})
export class PoliticalComponent {
  title: string = "Political"
  politicalScript: any
  formData = new FormData();
  scriptData: any
  btnValue = "Submit"
  scriptIdToedit:any

  constructor(private loader:NgxSpinnerService, private router: Router, private titleService: TitleService, private fb: FormBuilder, private wishingScript: WishingscriptService, private toster: ToastrService) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.politicalScriptForm()
    this.getAllPolitical()
  }

  getAllPolitical() {
    this.wishingScript.getAllPoliticalScript({ "requestFrom": "Admin" }).subscribe((res: any) => {
      this.scriptData = res.data
    })
  }


  politicalScriptForm() {
    this.politicalScript = this.fb.group({
      thumbnail: ['', Validators.required],
      event: ['', Validators.required],
      eventType: ['Political', Validators.required],
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
      // inicialChartData:['', Validators.required],
      chartType: ['', Validators.required]
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
    // this.formData.delete('inicialChartData');
    this.formData.delete('chartType');
    this.formData.delete('mp3File');
    this.formData.delete('doorsImage');
    this.formData.delete('doorrsIcon');
    this.formData.delete('thumbnail');
    this.formData.delete('_id');
  }

  submit(scriptIdToedit:any) {
    // alert(this.scriptIdToedit)
    if(this.scriptIdToedit==undefined){
    // const formValues = this.politicalScript.value
    this.formData.append('event', this.politicalScript.value.event);
    this.formData.append('eventType', this.politicalScript.value.eventType);
    this.formData.append('eventTheme', this.politicalScript.value.eventTheme);
    this.formData.append('exipryDate', this.politicalScript.value.exipryDate);
    this.formData.append('firstWish', this.politicalScript.value.firstWish);
    this.formData.append('firstMessage', this.politicalScript.value.firstMessage);
    this.formData.append('secondMessage', this.politicalScript.value.secondMessage);
    this.formData.append('doorScript', this.politicalScript.value.doorScript);
    this.formData.append('title', this.politicalScript.value.title);
    this.formData.append('description', this.politicalScript.value.description);
    this.formData.append('tags', this.politicalScript.value.tags);
    // this.formData.append('inicialChartData', this.politicalScript.value.inicialChartData);
    this.formData.append('chartType', this.politicalScript.value.chartType);

    this.wishingScript.createWishingScript(this.formData).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.toster.success('Poll Create Successfully...');
          this.resetSubmittedFormData()
          this.politicalScript.reset()
          this.getAllPolitical()
        } else {
          this.toster.error('SomeThing errr');
          this.resetSubmittedFormData()
          this.politicalScript.reset()
        }
      },
      error: (error) => {
        this.resetSubmittedFormData()
        this.politicalScript.reset()
        this.toster.error('An error occurred  while creating Political Script.');
      },
    })
  }else{
    this.formData.append('_id', this.scriptIdToedit);
    this.formData.append('event', this.politicalScript.value.event);
    this.formData.append('eventType', this.politicalScript.value.eventType);
    this.formData.append('eventTheme', this.politicalScript.value.eventTheme);
    this.formData.append('exipryDate', this.politicalScript.value.exipryDate);
    this.formData.append('firstWish', this.politicalScript.value.firstWish);
    this.formData.append('firstMessage', this.politicalScript.value.firstMessage);
    this.formData.append('secondMessage', this.politicalScript.value.secondMessage);
    this.formData.append('doorScript', this.politicalScript.value.doorScript);
    this.formData.append('title', this.politicalScript.value.title);
    this.formData.append('description', this.politicalScript.value.description);
    this.formData.append('tags', this.politicalScript.value.tags);
    // this.formData.append('inicialChartData', this.politicalScript.value.inicialChartData);
    this.formData.append('chartType', this.politicalScript.value.chartType);

    this.wishingScript.updatepoliticalScript(this.formData).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.toster.success('Poll Updated Successfully...');
          this.resetSubmittedFormData()
          this.politicalScript.reset()
          this.getAllPolitical()
        } else {
          this.toster.error('SomeThing errr');
          this.resetSubmittedFormData()
          this.politicalScript.reset()
        }
      },
      error: (error) => {
        this.resetSubmittedFormData()
        this.politicalScript.reset()
        this.toster.error('An error occurred  while Updating Political Script.');
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

  changeStatus(status: any, id: any) {
    let changesStatus;
    if (status == 1) {
      changesStatus = 0
    } else if (status == 0) {
      changesStatus = 1
    }
    this.wishingScript.updateStatus({ status: changesStatus, id: id }).subscribe((res: any) => {
      if (res.status) {
        this.toster.success("Status Updated Successfully")
        this.getAllPolitical()
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

    this.politicalScript.patchValue({
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

  deleteScript(event:any){
    Swal.fire({
      title: 'Are you sure you want to delete this blog?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.wishingScript.deleteScriptPolitical(event._id).subscribe({
          next: (res: any) => {
            if (res.status) {
              Swal.fire(
                'Deleted!',
                'Political Script has been deleted.',
                'success'
              );
              this.getAllPolitical()
            } else {
              Swal.fire(
                'Something Error!',
                'Please Refresh this page and try again.',
                'error'
              );
            }
            // Hide loader after response is received
            this.loader.hide();
          },
          error: (error: any) => {
            this.toster.error(error.message);
            // Hide loader in case of error
            this.loader.hide();
          }
        });
      } else {
        // Hide loader if user cancels deletion
        this.loader.hide();
      }
    });
  }

}
