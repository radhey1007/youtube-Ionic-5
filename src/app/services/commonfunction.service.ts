import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonfunctionService {

  constructor() { }

  b64toBlob(b64Data) {
    let contentType = b64Data.split(',')[0].split(':')[1].split(';')[0] || '';
    var sliceSize = 256;

    var byteCharacters = atob(b64Data.split(',')[1]);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);

      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

}
