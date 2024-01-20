import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SummaryComponent } from './summary/summary.component';
import { BlogsComponent } from './blogs/blogs.component';
import { WebStoriesComponent } from './web-stories/web-stories.component';
import { DashboardComponent } from './dashboard.component';
import { RandomColorService } from '../services/random-color.service';
import { UserSectionComponent } from './user-section/user-section.component';
import { OccasionalComponent } from './wishing-scripts/occasional/occasional.component';
import { FestiveComponent } from './wishing-scripts/festive/festive.component';
import { PoliticalComponent } from './wishing-scripts/political/political.component';
import { GroupJoinerComponent } from './group-joiner/group-joiner.component';
import { FancyTextComponent } from './fancy-text/fancy-text.component';
import { Title } from '@angular/platform-browser';
import { AddEditComponent } from './blogs/add-edit/add-edit.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CategoriesComponent } from './categories/categories.component';
import { AddEditStoriesComponent } from './web-stories/add-edit-stories/add-edit-stories.component';
import { NgxSpinnerModule } from 'ngx-spinner';

 

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SummaryComponent,
    BlogsComponent,
    WebStoriesComponent,
    DashboardComponent,
    UserSectionComponent,
    OccasionalComponent,  
    FestiveComponent,
    PoliticalComponent,
    GroupJoinerComponent,
    FancyTextComponent,
    AddEditComponent,
    CategoriesComponent,
    AddEditStoriesComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    SweetAlert2Module.forRoot(),
    NgxSpinnerModule
  ],
  providers: [RandomColorService, Title],
})
export class DashboardModule { }
