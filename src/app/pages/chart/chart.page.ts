import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../services/security/auth.service';
import { ChartService } from '../../services/chart/chart.service';
import { Chart } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-chart',
  templateUrl: 'chart.page.html',
  styleUrls: ['chart.page.scss'],
})
export class ChartPageComponent implements OnInit {
  id: string;
  title: string;
  data: any;
  colors: string[] = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ]
  constructor(
    private auth: AuthService,
    private translocoService: TranslocoService,
    private activatedRoute: ActivatedRoute,
    private chartService: ChartService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.title = this.activatedRoute.snapshot.paramMap.get('title');
    this.selectChart();
  }

  selectChart(): void {
    switch (this.id) {
      case "1":
        this.data = this.chartProjectPerMonth();
        break;
      case "2":
        this.data = this.chartPercentageOfTags();
        break;
      case "3":
        this.data = this.chartTasksPerEmployee();
        break;
      case "4":
        this.data = this.chartCostPerDate();
        break;
    }
  }

  chartProjectPerMonth() {
    this.chartService
      .projectsPerDate()
      .subscribe(
        (res: any) => {
          this.generateChart(res);
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

  chartPercentageOfTags() {
    this.chartService
      .percentageOfTags()
      .subscribe(
        (res: any) => {
          this.generateChart(res);
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

  chartTasksPerEmployee() {
    this.chartService
      .tasksPerEmployee()
      .subscribe(
        (res: any) => {
          res.data = this.addColorOnElements(res.data);
          this.generateChartMulti(res);
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
  chartCostPerDate() {
    this.chartService
      .costPerDate()
      .subscribe(
        (res: any) => {
          console.log(res);          
          res.data = this.addColorOnElements(res.data);
          this.generateChartMulti(res);
        },
        (err: any) => {
          console.log(err);
          if (err.status = 403) {
            this.logout();
          }
        }
      );
  }

  generateChart(dto) {
    const canvas = document.getElementById('myChart');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    const myChart = new Chart(ctx, {
      type: dto.type,
      data: {
        labels: dto.labels,
        datasets: [{
          label: dto.label,
          data: dto.data,
          backgroundColor: this.colors
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  generateChartMulti(dto) {
    dto.data = this.addColorOnElements(dto.data);
    const canvas = document.getElementById('myChart');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    const myChart = new Chart(ctx, {
      type: dto.type,
      data: {
        labels: dto.labels,
        datasets: dto.data
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  generateChart12() {
    const canvas = document.getElementById('myChart');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  generateChart2() {
    const canvas = document.getElementById('myChart');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [{
          data: [{ id: 'desarrollo', nested: { value: 5 } }, { id: 'marketing', nested: { value: 3 } }]
        }]
      },
      options: {
        parsing: {
          xAxisKey: 'id',
          yAxisKey: 'nested.value'
        }
      }
    });
  }


  generateChart5() {
    const canvas = document.getElementById('myChart');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Purple', 'Yellow'],
        datasets: [{
          label: 'project',
          data: [45, 25, 20, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ]

        }],

      }
    });
  }

  addColorOnElements(data) {
    data.forEach(element => {
      Object.assign(element, { backgroundColor: this.colors[data.indexOf(element)] })
    });
    return data;
  }

  logout(): void {
    this.auth.setAuthenticated(false);
    this.auth.setToken('');
    this.router.navigate(['']);
  }
}
