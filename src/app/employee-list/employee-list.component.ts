import { Component, OnInit} from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  eName: string;
  eAge: number;
  count: number =  0;
 
  constructor(private empService: EmployeeService) {

   }

  ngOnInit() {
  this.empService.getEmployees()
      .subscribe(data  => {
        this.employees = data
     }
    )
  }

  onFetchData(){
      this.empService.getEmployees()
      .subscribe(data  => {
        this.employees = data
     }
    )
  }

  onClearData(){
    this.empService.deleteData().subscribe(data =>{
      this.employees = [];
      this.count =0;
    })
  }

  addNewEmployee(){
    console.log("name is " +this.eName)
    const newEmployee = {name: this.eName, id: this.count++, age: this.eAge};
      //  console.log(newEmployee);
        this.empService.addEmployees(newEmployee).subscribe(data =>{
          this.onFetchData();
        })
    
  }

  deleteEmp(id: number){
    console.log("delete in emp-list " + id);
    this.empService.deleteEmployee(id).subscribe(data =>{
      this.onFetchData();
    }
    )


  }






  


}