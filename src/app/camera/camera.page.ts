import { Photo } from './../../../node_modules/@capacitor/camera/dist/esm/definitions.d';
import { Picture } from './../models/picture';
import { PictureService } from './../services/picture.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  selectedImage: Photo;

  public pictures: Picture[];
  public picture: Picture;

  constructor(
    private pictureService: PictureService
  ) { }

  ngOnInit() {
    this.pictureService.getPictures().subscribe(res => {
      this.pictures = res;
      console.log(this.pictures);
    })
  }

  async getPicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Prompt,
      width: 400,
      resultType: CameraResultType.DataUrl
    });
    this.selectedImage = image;
    //if(this.checkPlataformForWeb()) this.selectedImage.webPath = image.dataUrl;
    this.picture = {
      url: this.selectedImage.dataUrl
    }
    this.pictureService.savePicture(this.picture);
    //console.log(this.selectedImage.webPath);
  }

}
