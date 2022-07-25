import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../services/security/auth.service';
import { ChartService } from '../../services/chart/chart.service';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-chart',
  templateUrl: 'chart.page.html',
  styleUrls: ['chart.page.scss'],
})
export class ChartPageComponent implements OnInit {
  id: string;
  title:string;
  data: any;
  constructor(
    private auth: AuthService,
    private translocoService: TranslocoService,
    private activatedRoute: ActivatedRoute,
    private chartService: ChartService,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("id:", this.id)
    this.selectChart();
  }

  selectChart(): void {
    switch (this.id) {
      case "1":
        this.title = "Proyectos finalizados"
        console.log("select");
        this.data = this.serviceProjectPerMonth();
        break;
      case "2":
        break;
      case "3":
        break;
    }
  }

  serviceProjectPerMonth() {
    console.log("select 2");
    this.chartService
      .projectsPerDate()
      .subscribe(
        (res: any) => {
          this.generateChartLine(res);
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      );

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

  generateChartLine(dto) {
    const canvas = document.getElementById('myChart');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: dto.label,
          data: dto.data,
          backgroundColor: [
            'rgba(255, 206, 86, 1)'
          ]
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
  generateChart4() {
    const canvas = document.getElementById('myChart');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    const data = [{ x: 'Jan', net: 100, cogs: 50, gm: 50 }, { x: 'Feb', net: 120, cogs: 55, gm: 75 }];

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb'],
        datasets: [{
          label: 'Net sales',
          data: data,
          parsing: {
            yAxisKey: 'net'
          }
        }, {
          label: 'Cost of goods sold',
          data: data,
          parsing: {
            yAxisKey: 'cogs'
          }
        }, {
          label: 'Gross margin',
          data: data,
          parsing: {
            yAxisKey: 'gm'
          }
        }]
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


}
