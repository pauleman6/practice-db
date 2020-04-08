import { Component, OnInit } from '@angular/core';
import {Employee} from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  eName: string;
  eAge: number;
  newEmployee: Employee;
  count: number =  0;
 
  constructor(private empService: EmployeeService
  ) { }

  ngOnInit() {
  }

    onKey(n: string){
    this.eName = n;

  }

  addNewEmployee(){
    console.log("name is " +this.eName)
    this.newEmployee = {name: this.eName, id: this.count++, age: this.eAge};
        console.log(this.newEmployee);
        this.empService.addEmployees(this.newEmployee);
  }

  

}