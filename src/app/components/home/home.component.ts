import { Component, OnInit } from '@angular/core';
import { remote } from 'electron';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  processName: string;

  constructor() { }

  ngOnInit() {

  }

  async checkProcessName() {
    console.log('Process name', this.processName);
    const isRunning = await remote.getGlobal('isRunning')(this.processName);
    console.log('Is running', isRunning);
    alert(`O processo ${this.processName} ${isRunning ? 'está' : 'não está'} rodando...`)
  }

  async logAllProcess() {
    const allProcess: any[] = await remote.getGlobal('allProcess')();
    console.log('All process', allProcess);
    console.log('O processo procurado está rodando?', allProcess.find(x => x.name == this.processName));
  }
}
