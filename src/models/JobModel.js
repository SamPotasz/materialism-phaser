import StudentModel from './StudentModel';

export default class JobModel {
  constructor(jobData){
    this.jobData = jobData;
    console.log(this.jobData)
    this.student = new StudentModel(jobData.student);
    console.log(this.student)
  }
}