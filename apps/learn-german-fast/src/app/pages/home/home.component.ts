import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UtilsService } from 'libs/service/src/lib/utils/utils.service';
import { CourseService } from '../../services/course.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'cahotech-monorepo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedCourse = ''

  constructor(
    public utilsProv: UtilsService,
    public courseProv: CourseService,
    public l: LangService

  ) { }

  ngOnInit (): void {
  }


  levelSelected () {


  }


}
