import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { EmployeeService } from '../../services/employee/employee.service';
import { AuthService } from '../../services/security/auth.service';



@Component({
  selector: 'app-tasks',
  templateUrl: 'employees.page.html',
  styleUrls: ['employees.page.scss'],
})
export class EmployeesPageComponent implements OnInit {
  employees: any;
  employee: any;
  isModalOpen: boolean = false;
  colorStage :any = {
    1 : 'danger',
    2 : 'warning',
    3 : 'success',
    4 : 'dark'
  };
  constructor(
    private auth: AuthService,
    private employeeService: EmployeeService,
    private translocoService: TranslocoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.employeeService
      .getEmployees()
      .subscribe(
        (res: any) => {
          this.employees = res;
          console.log(res);
        },
        (err: any) => {
          console.log(err);
          if (err.status = 403) {
            this.logout();
          }
        }

      );
  }

  setOpen(isOpen: boolean, employee: any) {
    console.log(employee);
    this.employee = employee;
    this.isModalOpen = isOpen;    
  }

  logout(): void {
    this.auth.setAuthenticated(false);
    this.auth.setToken('');
    this.router.navigate(['']);
  }

}
