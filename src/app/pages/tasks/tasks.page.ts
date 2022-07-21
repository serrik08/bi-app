import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ProjectService } from '../../services/project/project.service';
import { AuthService } from '../../services/security/auth.service';



@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss'],
})
export class TaskPageComponent {

  constructor(    
    private auth: AuthService,
    private projectService: ProjectService,
    private translocoService: TranslocoService,
  ) { }


}
