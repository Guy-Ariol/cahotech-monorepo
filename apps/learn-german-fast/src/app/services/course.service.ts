import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  allCourses = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

  constructor() { }
}
