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

  async killProcessIfFound() {
    const allProcess: any[] = await remote.getGlobal('allProcess')();
    console.log('All process', allProcess);
    const processFound =  allProcess.find(x => x.name == this.processName);
    if(processFound) {
      console.log('Processo encontrado ', processFound);
      process.kill(processFound.pid);
    } else {
      console.log("O processo não foi encontrado")
    }
    
  }

  async startProcess() {
    remote
      .getGlobal('startProcess')('path')
      .then((result) => {
        console.log('Open success', result);
      }, err => console.log('Error opening process', err));
  }
}
