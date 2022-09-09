import { Component, Renderer2 } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';

  constructor(private http: HttpClient){}
  
  inputFileChange(event: any) {

    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.preview = '';

    if (event.target.files && event.target.files[0]) {
      const foto = event.target.files[0];

      let banner;

      let reader = new FileReader();

      // Trata o preload da imagem no html
      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };


      reader.readAsDataURL(foto);
      reader.onloadend = () => {

        // Trata o envio da requisição
        banner = reader.result as String;

        var formData: any = new FormData();
        formData.append('banner',banner);

        this.http.post('http://localhost:3000/store/loja-13/banners',formData)
        .subscribe(
          (val) => {
            this.message = 'Sucesso: ' + JSON.stringify(val);
          },
          response => {
              this.message = JSON.stringify(response.error.message);

          },
          () => {
              console.log("The POST observable is now completed.");
          });

          

      }
      
    }
  }

}
