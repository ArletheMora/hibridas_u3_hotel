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

  selectedImage: any;

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

  /* checkPlataformForWeb() {
    if (Capacitor.getPlatform() == 'web') return true;
    return false;
  } */

  async getPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Prompt,
      width: 600,
      resultType: CameraResultType.Uri
    });
    this.selectedImage = image;
    /* if(this.checkPlataformForWeb())  */
    this.selectedImage.webPath = image.dataUrl;
    this.picture = {
      url: this.selectedImage.webPath
    }
    this.pictureService.savePicture(this.picture);
    console.log(this.selectedImage.webPath);
  }

}
