import { Injectable } from "@angular/core";
import { Employee } from "./employee";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class EmployeeService {
//  employees: Observable<Employee[]>;
  objectId: string[] = []; //array to store the firebase object id
  count: number = 0; //count to keep index of the objectId array
  deletes: number = 0;

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
   
   this.objectId = [];
   this.count = 0;

    return this.http
      .get<Employee[]>(
        "https://httpemployee-bc50e.firebaseio.com/employee.json"
      )
      .pipe(
        //transform the data to parse employee objects
        map(responseData => {
          const postsArray: Employee[] = []; //array to store employee objects
          for (const key in responseData) {
            postsArray.push(responseData[key]); //pushing next employee object into array
             this.objectId[this.count++] = key; //store the object key information for delete
            console.log("current object's id is : " + key);
          }
          return postsArray;
        })
      );
    console.log(this.objectId.length);
   // return this.employees;
  }


  // empObjectIDArray(){


  //   this.http
  //     .get<Employee[]>(
  //       "https://httpemployee-bc50e.firebaseio.com/employee.json"
  //     )
  //     .pipe(
  //       //transform the data to parse employee objects
  //       map(responseData => {
  //         for (const key in responseData) {
  //         //  postsArray.push(responseData[key]); //pushing next employee object into array
  //           this.objectId[this.count++] = key; //store the object key information for delete
  //           console.log("current object's id is : " + key);
  //         }
  //       })
  //     );
  // }
  addEmployees(emp: Employee) {
    return this.http.post("https://httpemployee-bc50e.firebaseio.com/employee.json",emp);
  }

  deleteEmployee(id: number) {
   // let temp : number  = (id - this.deletes);
  //  console.log("id - deletes " + temp);
    let empId: string = this.objectId[id ];
    console.log("Current length of objectId: " + this.objectId.length);
    console.log("empId is " + empId + "id value is " + id);
    this.deletes++;
    console.log("number of deletes" + this.deletes);
    return this.http.delete(
      "https://httpemployee-bc50e.firebaseio.com/employee/" + empId + ".json");
  }

  deleteData() {
    this.employees = null;
     this.objectId = [];
     this.count = 0;

    return this.http.delete(
      "https://httpemployee-bc50e.firebaseio.com/employee.json"
    );
  }
}
