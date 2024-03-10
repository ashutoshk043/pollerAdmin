import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { BlogsComponent } from './blogs/blogs.component';
import { WebStoriesComponent } from './web-stories/web-stories.component';
import { OccasionalComponent } from './wishing-scripts/occasional/occasional.component';
import { FestiveComponent } from './wishing-scripts/festive/festive.component';
import { PoliticalComponent } from './wishing-scripts/political/political.component';
import { UserSectionComponent } from './user-section/user-section.component';
import { GroupJoinerComponent } from './group-joiner/group-joiner.component';
import { FancyTextComponent } from './fancy-text/fancy-text.component';
import { AddEditComponent } from './blogs/add-edit/add-edit.component';
import { authGuard } from '../guards/auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { AddEditStoriesComponent } from './web-stories/add-edit-stories/add-edit-stories.component';


const routes: Routes = [
  {
    path:'',
    component:SummaryComponent,
    pathMatch:'full',
    canActivate:[authGuard]
  },
  {
    path:'summary',
    component:SummaryComponent,
    canActivate:[authGuard],
    data : {  
      title: 'Summary'  
   }  
  },
  {
    path:'blogs',
    component:BlogsComponent,
    canActivate:[authGuard],
    data : {  
      title: 'Blogs'  
   } 
  },
  {
    path:'web-stories',
    component:WebStoriesComponent,
    canActivate:[authGuard],
    data : {  
      title: 'Web Stories'  
   } 
  },
  {
    path:'home/add-edit-webstories',
    component:AddEditStoriesComponent,
    canActivate:[authGuard],
    data : {  
      title: 'Add - Edit Webstories'
   },
  },
  {
    path:'occasional',
    component:OccasionalComponent,
    canActivate:[authGuard],
    data : {  
      title: 'Occasional Wishing Scripts'  
   } 
  },
  {
    path:'festive',
    component:FestiveComponent,
    canActivate:[authGuard],
    data : {  
      title: 'Festive Wishing Scripts'  
   }
  },
  {
    path:'political',
    component:PoliticalComponent,
    canActivate:[authGuard],
    data : {  
      title: 'Political Wishing Scripts'  
   }
  },
  {
    path:'users',
    component:UserSectionComponent,
    canActivate:[authGuard],
    data : {  
      title: 'User Section'  
   }
  },
  {
    path:'group-joiner',
    component:GroupJoinerComponent,
    canActivate:[authGuard],
    data : {  
      title: 'Group Joiner'  
   }
  },
  {
    path:'fancy-text',
    component:FancyTextComponent,
    canActivate:[authGuard],
    data : {  
      title: 'Fancy Text'  
   },
  },
  {
    path:'home/add-edit-blogs',
    component:AddEditComponent,
    canActivate:[authGuard],
    data : {  
      title: 'Add - Edit blogs'
   },
  },
  {
    path:'categories',
    component:CategoriesComponent,
    canActivate:[authGuard],
    data : {  
      title: 'Categories'
   },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
