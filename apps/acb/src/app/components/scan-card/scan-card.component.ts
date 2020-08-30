import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { UserService } from 'libs/service/src/lib/user/user.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'scan-card',
  templateUrl: './scan-card.component.html',
  styleUrls: ['./scan-card.component.scss']
})
export class ScanCardComponent implements OnInit {

  @Input() title
  @Input() subTitle
  @Output() onChanged = new EventEmitter
  @Input() titleColor = '6d3f03'
  @Input() pic
  @Input() passwordInput

  currentValue = ''


  inputUpdate = new Subject<string>()


  focussed = false


  isSOS = false

  /**
   *Creates an instance of NfcTagComponent.
   * @param {UtilsService} utils
   * @param {UserService} userProv
   * @memberof NfcTagComponent
   */
  constructor(
    public utils: UtilsService,
    public userLib: UserService,

  ) { }


  ngOnInit (): void {
    this.inputUpdate.pipe(
      debounceTime(100),
      distinctUntilChanged())

      .subscribe(() => {
        this.onChanged.emit(this.currentValue)
        this.currentValue = ''
      });
  }


  ngAfterContentInit () {
    setTimeout(() => {
      try {
        document.getElementById('activate-nfc-tap').click()
      } catch (error) {

      }
    }, 100);
  }


  submit (arg) {
    if (this.passwordInput) {
      if (arg == this.userLib.currentUser.adminPass) this.onChanged.emit(arg)
      else this.utils.showToast('error', "Mot de passe incorrect", 'Érreur')
    }
    else {
      this.onChanged.emit(arg)
    }
  }


  checkInput (code, value) {
    if (code == "Enter") this.submit(value)
  }


  showInput () {
    if (this.isSOS) {
      let el = document.getElementById('tap-input-sos')
      el.classList.add('hide-card-input')
      this.isSOS = false
    }
    else {
      let el = document.getElementById('tap-input-sos')
      el.classList.remove('hide-card-input')
      el.focus()
      this.isSOS = true
    }
  }


  activateNFCpad (element) {
    this.isSOS = false

    let el = document.getElementById('tap-input-sos')
    el.classList.add('hide-card-input')

    this.focussed = true;
    element.focus();
    this.utils.publishBroadcast('close side menu', {})
  }

}
