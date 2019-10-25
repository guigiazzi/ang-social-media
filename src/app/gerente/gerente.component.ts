import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './../lib/canvasjs.min';
import { AppService } from '../app.service';

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.css']
})
export class GerenteComponent implements OnInit {
  public top10Users = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getTop10ProfessionalsWithMostFriends()
    .subscribe(res => {
        res.forEach(user => {
          this.top10Users.push({y: user.numberOfFriends, label: user.professional.name});
        });
        this.createChart();
    });
  }

  createChart() {
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        title: {
            text: 'Profissionais com maior número de amizades'
        },
        axisY: {
            title: 'Número de amizades'
        },
        data: [{
            dataPoints: this.top10Users
        }]
    });
    chart.render();
  }

}
