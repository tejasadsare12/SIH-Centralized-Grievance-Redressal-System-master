import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { Status } from '../userarea/classes/complaints_class/complaints_status';
import { StatusX } from '../admin-dashboard/pendcomplaints/pendingStats';
import {BehaviorSubject} from 'rxjs/Rx';
import { locationX  } from '../userarea/userform/location'
require('aws-sdk/dist/aws-sdk');


@Injectable()
export class AppService {
  isLoggedIn : boolean;
  status : Observable<Status[]>;
  private _status: BehaviorSubject<Status[]>;
  private dataStore: {
    status: Status[]
  };

  statusX : Observable<StatusX[]>;
  private _statusX: BehaviorSubject<StatusX[]>;
  private dataStoreX: {
    statusX: StatusX[]
  };


   fetchUrl = '';


  constructor(
    private _http: Http
  ) {
    this.dataStore = { status: [] };
    this._status = <BehaviorSubject<Status[]>>new BehaviorSubject([]);
    this.status = this._status.asObservable();

    this.dataStoreX = { statusX: [] };
    this._statusX = <BehaviorSubject<StatusX[]>>new BehaviorSubject([]);
    this.statusX = this._statusX.asObservable();

  }

 loginFun(usercreds):Promise<any>{
   this.isLoggedIn = false;
   var headers = new Headers();
   var creds = 'email=' + usercreds.emailId + '&password'+ usercreds.password;
   headers.append('Content-type','application/x-www-form=urlencoded')
   window.localStorage.setItem('a',usercreds.emailId);
   window.localStorage.setItem('b',usercreds.password);
  return new Promise ((resolve) => {

   this._http.post(`http://54.169.134.133:80/auth/user_login?email=`+usercreds.emailId+`&password=`+usercreds.password,{headers:headers})
   .map( res => res.json())
     .subscribe((res) =>{
       if(res.status === "success"){
         window.localStorage.setItem('access_token',res.access_token);
         window.localStorage.setItem('secret_key',res.secret_key);
         resolve(res);
       }
       else if(res.status === "error"){

             resolve(res);
       }
     })


   })


 }
//this._http.post(`http://54.169.134.133:80/user/signup?name=`+usercreds.name+`&contact=`+usercreds.contact+`&email=`+usercreds.emailId+`&password=`+usercreds.password,{headers:headers})
signUpFun(usercreds):Promise<any>{

  var headers = new Headers();

  headers.append('Content-type','application/x-www-form=urlencoded')
  headers.append('check','check')
console.log('reached',usercreds);
 return new Promise ((resolve) => {
  this._http.post(`http://54.169.134.133:80/user/signup?name=`+usercreds.name+`&contact=`+usercreds.contact+`&email=`+usercreds.emailId+`&password=`+usercreds.password,{headers:headers})
  .map( res => res.json())
    .subscribe((res) =>{
      if(res.status === "success"){
        console.log('successCheck');

    resolve(res);

  }else if(res.status === "error"){
     console.log('error');
     resolve(res);
  }
    })


  })

}

getStatusX(){
 this._http.get(`http://54.169.134.133:80/complaint/show_user_complaints`,{headers:this.getHeaders()})
      .map( res => res.json()).subscribe(res => {
        this.dataStore.status = res;
        this._status.next(Object.assign({},this.dataStore).status);
      },error => console.log('oops')
    );

  }

  // loadAll() {
  //     this.http.get(`${this.baseUrl}/todos`).map(response => response.json()).subscribe(data => {
  //       this.dataStore.todos = data;
  //       this._todos.next(Object.assign({}, this.dataStore).todos);
  //     }, error => console.log('Could not load todos.'));
  //   }




  private getHeaders(){
    let headers = new Headers();

     //headers.append('Access-Control-Allow-Methods','GET, POST, OPTIONS');
     headers.append('Content-type','form-data');
     headers.append('access_token',window.localStorage.getItem('access_token'));
     headers.append('secret_key',window.localStorage.getItem('secret_key'));
     window.localStorage.setItem('intercepted_access_token',window.localStorage.getItem('access_token'));
      window.localStorage.setItem('intercepted_secret_key',window.localStorage.getItem('secret_key'));
     console.log('headers',headers);
    return headers;
  }

// checkLoc(location){
//   console.log('please',location)
// }

awsService(file : any){
  var file = file;
  var AWSService = window.AWS;
  AWSService.config.accessKeyId = 'AKIAI4XWYQDCVLFHOW5Q';
  AWSService.config.secretAccessKey = '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';
  var bucket = new AWSService.S3({params: {ACL :"public-read" ,Bucket: 'asarcgrs'}});
  var params = {Key: file.name, Body: file};


  bucket.upload(params, function (err, data) {
    window.localStorage.setItem('imagefileurl',data.Location);
 })

}


adminFetchComp(){
return this._http.get(`http://54.169.134.133:80/admin_user/fetch_complaints`,{headers:this.getAdminHeaders()})
       .map( res => res.json())
}


  private getAdminHeaders(){
    let headers = new Headers();

     //headers.append('Access-Control-Allow-Methods','GET, POST, OPTIONS');
     headers.append('Content-type','form-data');
     headers.append('access_token',window.localStorage.getItem('admin_access_token'));
     headers.append('secret_key',window.localStorage.getItem('admin_secret_key'));
     //window.localStorage.setItem('intercepted_access_token',window.localStorage.getItem('access_token'));
      //window.localStorage.setItem('intercepted_secret_key',window.localStorage.getItem('secret_key'));
     console.log('headers',headers);
    return headers;
  }


  getStats(){
    return this._http.get(`http://54.169.134.133:80/admin_user/fetch_statistics`,{headers:this.getAdminHeaders()})
          .map(res=>res.json())
  }


  getDetailsComp(param){
    this.fetchUrl = 'http://54.169.134.133:80/complaint/show_complaint_by_id?id='+param
    return this._http.get(this.fetchUrl,{headers:this.getAdminHeaders()})
      .map(res => res.json())
  }


}


////
