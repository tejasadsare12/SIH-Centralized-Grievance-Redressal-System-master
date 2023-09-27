import { Component , OnInit } from '@angular/core';
import { AppService } from '../../../services/app-services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pendbyid-component',
  templateUrl: './pendbyid.component.html',
  styleUrls: ['./pendbyid.component.css'],
  providers : [AppService]
})
export class PendByIdComponent implements OnInit  {

 id: string;
  status = {

  }

  constructor(
    private _service : AppService,
    private _route : ActivatedRoute
  ){

  }
  ngOnInit(){
    this._route.params
    .map(params => params['id'])
    .switchMap(id => this._service.getDetailsComp(id))
    .subscribe(status => console.log('please chec',this.status = status));
  }




}
