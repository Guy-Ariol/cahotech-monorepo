import { Injectable, Directive, Inject, HostListener } from '@angular/core';
import { EventEmitter } from 'events';
import { ToastrService } from 'ngx-toastr';

/**
 * general utils functions
 * @export
 * @class UtilsService
 */
@Injectable(
  {
    providedIn: 'root'
  }
)
export class UtilsService {
  /** color of the spinner
   *
   */
  spinColor = ''

  /** activate or deactivate the spinner
  *
  */
  spinner = false

  /** global variable for actual screen size
  *
  */
  screenSize: 'XS' | 'SM' | 'MD' | 'LG'

  /** is the current platform a desktop ?
  *
  */
  isDesktop = false

  /** is the current platform a mobile ?
  *
  */
  isMobile = false

  /** wish route blocked due to auth
   *
   * @memberof UtilsService
   */
  blockedRoute = ''

  /**
   *Creates an instance of UtilsService.
   * @memberof UtilsService
   */
  constructor(
    @Inject(EventEmitter) private event: EventEmitter,
    private toast: ToastrService
  ) { }

  /** generate random code
   *
   * @param {number} length
   * @param {boolean} [numericOnly=true]
   * @returns
   * @memberof UtilsService
   */
  randomId (length: number, numericOnly: boolean = true) {
    let result = '';
    let characters

    if (!numericOnly) characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    else characters = '0123456789'

    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /** check if email formatting is correct or not
   *
   * @param {*} arg
   * @returns
   * @memberof UtilsService
   */
  checkEmail (arg) {
    if (arg) {
      return arg.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) == null
        ? false
        : true
    }
    else {
      return false
    }
  }

  /** dynamically change the title in app header
   *
   * @param {*} title
   * @memberof UtilsService
   */
  changeHeaderTitle (title) {
    if (title == '/admin') this.event.emit('change-header-title', 'Admin')
    else if (title == '/load') this.event.emit('change-header-title', 'Ajouter des points')
    else if (title == '/') this.event.emit('change-header-title', 'Africa Cash Return')
    else if (title == '/super-admin') this.event.emit('change-header-title', 'Super Admin')
  }

  /** show custom notificatio to the user
   *
   * @param {('success' | 'error' | 'warning' | 'info')} type
   * @param {*} content
   * @param {*} title
   * @param {('toast-bottom-center' | 'toast-top-right' | 'toast-top-center' | 'toast-top-full-width' | 'toast-bottom-full-width')} [position]
   * @param {*} [duration]
   * @memberof UtilsService
   */
  showToast (type: 'success' | 'error' | 'warning' | 'info', content, title,
    position?: 'toast-bottom-center' | 'toast-top-right' | 'toast-top-center' | 'toast-top-full-width' | 'toast-bottom-full-width',
    duration?) {

    if (!position) {
      if (this.screenSize == 'XS') position = 'toast-bottom-center'
      else position = 'toast-top-right'
    }

    if (duration == null) duration = 3000

    if (type == 'success') this.toast.success(content, title, { positionClass: position, timeOut: duration })
    else if (type == 'error') this.toast.error(content, title, { positionClass: position, timeOut: duration })
    else if (type == 'warning') this.toast.warning(content, title, { positionClass: position, timeOut: duration })
    else if (type == 'info') this.toast.info(content, title, { positionClass: position, timeOut: duration })
  }

  /** show spinner
   *
   * @memberof UtilsService
   */
  startSpinner () {
    this.spinner = true
  }

  /** hide spinner
   *
   * @memberof UtilsService
   */
  stopSpinner () {
    this.spinner = false
  }

  /** dynamically set screen breakpoints
   *
   * @param {number} width
   * @param {number} height
   * @memberof UtilsService
   */
  setScreenSize (width: number, height: number) {
    console.log(width, height);

    if (width <= 640) this.screenSize = 'XS'
    else if (width <= 1080) this.screenSize = 'SM'
    else if (width <= 1439) this.screenSize = 'MD'
    else if (width > 1439) this.screenSize = 'LG'

    if (width <= 600) { this.isMobile = true; this.isDesktop = false }
    else { this.isDesktop = true; this.isMobile = false }

    console.log(this.screenSize, this.isMobile)

  }

  /** publish generic broadcast event
   *
   * @param {*} name
   * @param {*} data
   * @memberof UtilsService
   */
  publishBroadcast (name, data) {
    this.event.emit(name, data)
  }


}
