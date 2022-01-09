import { Component, OnInit} from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  constructor(public dataservice: DataService) { }

  calculateZoom()
  {
    /*
    //caluclate the zoom of the view container so that the flexbox fits
    const numberGridFlexboxWidth = document.getElementById('numberGridFlexbox')!.clientWidth;
    const screenWidth = window.innerWidth;

    var zoom = screenWidth / numberGridFlexboxWidth * 100;
    if (zoom < 100)
    { zoom = zoom - (zoom * 0.05) }//subtract 5% to account for the padding and margins
    else { zoom = 100; } //zoom never goes higher than 100
    if (zoom < 50) { zoom = 50; } //zoom never goes lower than 50%
    this.dataservice.zoom = Math.round(zoom); 

    console.log(this.dataservice.zoom)

    //log an error warning to the user
    if (this.dataservice.log[this.dataservice.log.length - 1] != "There may be an error NG0100 but just ignore it")
    { this.dataservice.logOut("There may be an error NG0100 but just ignore it"); }
    */

    const numberGridFlexboxWidth = document.getElementById('numberGridFlexbox')!.clientWidth;
    const screenWidth = window.innerWidth;

    var zoom = screenWidth / numberGridFlexboxWidth;
    if (zoom < 1)
    { zoom = zoom - (zoom * 0.05) }//subtract 5% to account for the padding and margins
    else { zoom = 1; } //zoom never goes higher than 100
    if (zoom < 0.5) { zoom = 0.5; } //zoom never goes lower than 50%

    console.log(typeof zoom)
    this.dataservice.zoom = zoom;
  }


  ngOnInit(): void {
  }

}
