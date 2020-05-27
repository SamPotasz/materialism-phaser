export default class StudentModel {
  constructor( studentData ) {
    Object.assign( this, studentData );
  }

  activate() {
    this.isActive = true;
  }
}