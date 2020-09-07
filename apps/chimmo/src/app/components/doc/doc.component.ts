import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {

  @Input() docList = []
  isCapturing = false
  multipleWebcamsAvailable = false;
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  width
  height
  done = false

  constructor() { }

  ngOnInit (): void {

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

      this.width = screen.availWidth - 20
      this.height = screen.availHeight -20

      console.log(this.width, this.height)

  }

  triggerSnapshot (): void {
    this.trigger.next();
  }

   handleInitError (error: WebcamInitError): void {
    console.log(error);
  }

   showNextWebcam (directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

   handleImage (webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.isCapturing = false
    this.done = true
    console.log(webcamImage)

  }

  public get triggerObservable (): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable (): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

}
