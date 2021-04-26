import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any;
  book:any={};
  books:any=[];
  constructor(
    public dialog:MatDialog,
    public api:ApiService

  ) {

   }

  ngOnInit(): void {
    
    this.title='Products';
    this.book={
      title:'Angular saya',
      author:'Saya',
      publisher:'Sunhouse Digital',
      year:2020,
      isbn:'8298377474',
      price:70000
    };
    this.getBooks();
  }
  loading:boolean =false;
  getBooks(
  )
  {
    this.loading=true;
    this.api.get('bookswithauth').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },error=>{
      this.loading=false;
    });
    
  }  

  productDetail(data: any,idx: number)
 {
   let dialog=this.dialog.open(ProductDetailComponent, {
     width:'400px',
     data:data
   });
   dialog.afterClosed().subscribe(res=>{
     if(res)
     {
        //jika idx=-1 (penambahan data baru) maka tambahkan data
       if(idx==-1)this.books.push(res);      
        //jika tidak maka perbarui data  
       else this.books[idx]=data; 
     }
   })
 }

 loadingDelete:any={};
 deleteProduct(_id: string,idx: any)
 {
  
   var conf=confirm('Delete item?');
   if(conf)
   {
    this.loadingDelete[idx]=true;
    this.api.delete('books/'+this.books[idx].id).subscribe(_result=>{
      this.books.splice(idx,1);
      this.loadingDelete[idx]=false;
    },_error=>{
      alert('Tidak dapat menghapus data');
      this.loadingDelete[idx]=false;
    });

   }
 }
 upload(data: any, idx: any)
{
 let dialog=this.dialog.open(FileUploaderComponent, {
   width:'400px',
   data:data
 });
 dialog.afterClosed().subscribe(res=>{
   return;
 })
}


}
function id(id: any, arg1: number) {
  throw new Error('Function not implemented.');
}