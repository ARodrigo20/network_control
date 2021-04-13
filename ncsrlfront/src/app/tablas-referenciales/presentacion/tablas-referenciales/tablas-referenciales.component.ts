import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';

@Component({
  selector: 'app-tablas-referenciales',
  templateUrl: './tablas-referenciales.component.html',
  styleUrls: ['./tablas-referenciales.component.scss']
})
export class TablasReferencialesComponent implements OnInit {

  constructor(
    public activatedroute: ActivatedRoute, 
    public gS: GeneralService,
  ) {
    var titles = this.activatedroute.snapshot.data['title'];
    this.gS.setTitle(titles.split('/'));
  }

  ngOnInit() {
  }

}
