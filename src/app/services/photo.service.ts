import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";
import { FileChooser } from "@ionic-native/file-chooser";
import { IOSFilePicker } from "@ionic-native/file-picker";
import { File, FileEntry } from "@ionic-native/file";
import { ImagePicker } from "@ionic-native/image-picker";


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];
  attachments: any;
  imageArray: any[];
  selectedAttachmentCount: number;

  constructor(private camera: Camera,
     private storage: Storage,
     private fileChooser: FileChooser,
     private filePicker: IOSFilePicker,
     private transfer: FileTransfer,
     private file: File,
     private imagePicker: ImagePicker,
     ) { }

  takePicture() { 
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });
      this.uploadAttachment(imageData);
      // Save all photos for later viewing
      this.storage.set('photos', this.photos);
    }, (err) => {
     // Handle error
     console.log("Camera issue: " + err);
    });
   }


   uploadAttachment(dataUrl,indx: any = 0) {

    let fileExtension: any = "";
    console.log("dataUrl", dataUrl);

    this.file
      .resolveLocalFilesystemUrl(dataUrl)
      .then((fileEntry: FileEntry) => {
        fileEntry.file(fileObj => {
          if (fileObj.size > 1024 * 1024 * 10) {
            alert('File Size Exceeded, Document is larger than 10MB.  Please check your Camera Settings');
          } else {
            console.log("fileObj.type", fileObj.type);

            switch (fileObj.type) {
              case "application/pdf":
                fileExtension = ".pdf";
                break;
              case "image/gif":
                fileExtension = ".gif";
                break;
              case "image/jpeg":
              case "image/jpg":
                fileExtension = ".jpeg";
                break;
              case "image/png":
                fileExtension = ".png";
                break;
              case "text/comma-separated-values":
              case "text/csv":
                fileExtension = ".csv";
                break;
              case "text/plain":
                fileExtension = ".txt";
                break;
              case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                fileExtension = ".xlsx";
                break;
              case "application/vnd.ms-excel":
                fileExtension = ".xls";
                break;
              case "application/msword":
                fileExtension = ".doc";
                break;
              case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                fileExtension = ".docx";
                break;
              case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                fileExtension = ".pptx";
                break;
              case "video/mp4":
                fileExtension = ".mp4";
                break;
              case "video/avi":
                fileExtension = ".avi";
                break;
              case "video/wmv":
                fileExtension = ".wmv";
                break;
              case "video/flv":
                fileExtension = ".flv";
                break;
              default:
                alert('This file format is not supported');
                return false;
            }

            this.getBase64(fileObj, result => {
              console.log('result===', result);
              if (
                fileExtension == ".gif" ||
                fileExtension == ".jpeg" ||
                fileExtension == ".png"
              ) {
                this.imageArray.push(result);
              } else {
                this.attachments.push({
                  url: result,
                  extension: fileExtension.replace(".", ""),
                  title: "",
                  checked: false
                });
                this.imageArray = [];
              }
              console.log(this.attachments);
            });
          }
        });
      });
  }
  getBase64(fileObj, callback) {
    
    var reader = new FileReader();
    
    if (fileObj) {
      reader.readAsDataURL(fileObj);
      reader.onload = function() {  
        callback(reader.result);
      }
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    }    
  }

  loadSaved() {
    this.storage.get('photos').then((photos) => {
      console.log('photos in loading storage====', this.photos);
      this.photos = photos || [];
    });
  }
}

class Photo {
  data: any;
}
