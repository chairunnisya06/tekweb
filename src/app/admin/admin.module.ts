import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialDesign } from '../material/material.module';
import { ImagesComponent } from './images/images.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';


const router: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'images',
        component:ImagesComponent
      },
      //pengaturan router untuk halaman product
     {
      path:'product',
      component:ProductComponent
    }, 
    {
      path:'',
      pathMatch:'full',
      redirectTo:'/admin/dashboard'
    }

    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ImagesComponent,
    ProductComponent,
    ProductDetailComponent,
    FileUploaderComponent
  ],
  entryComponents:[   
  ], 
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    MaterialDesign,
    FormsModule
  ]
})
export class AdminModule { }
