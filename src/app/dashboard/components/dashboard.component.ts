import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { LoaderService } from "@app/core/services";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { BroadcastService } from "@app/core/services";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {


  private emailBroadcastListner: Subscription;

  noteValue = "Hello";
  id: any;
  constructor(
    private route: ActivatedRoute,

    private toastr: ToastrService,
    private broadcast: BroadcastService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log("Init");

    this.route.paramMap.subscribe(params => {
      this.id = Number(params['params']['id'])
      console.log(params['params']['id'], " parmasssss")
      let data = JSON.parse(localStorage.getItem("data")) || []
      const checkUsername = obj => obj.id === this.id;
      if (data.some(checkUsername)) {
        let obj = data.find((o, i) => {
          if (o.id === this.id) {
            this.noteValue = o.value;
            return true; // stop searching
          }
        });
      }
    });
    this.emailBroadcastListner = this.broadcast.listen().subscribe((res) => {
      setTimeout(() => {
        if (res.event.name === 'save') {
          this.router.navigate(["/dashboard"]);
          let data = JSON.parse(localStorage.getItem("data")) || []
          const checkUsername = obj => obj.id === this.id;

          if (data.some(checkUsername)) {
            let obj = data.find((o, i) => {
              if (o.id === this.id) {
                // this.noteValue = o.value;
                data[i] = { id: this.id, value:this.noteValue  ,  time: new Date().valueOf() };
                return true; // stop searching
              }
            });
          }
          else {
            data.push({
              id: this.id,
              time: new Date().valueOf(),
              value: this.noteValue || "Hello"
            })
          }
          localStorage.setItem("data", JSON.stringify(data))
          this.noteValue = ""
          this.broadcast.publish({
            name: 'getdata',
            // data:  thi,
          });
        }
        if (res.event.name === 'add') {
          let data = JSON.parse(localStorage.getItem("data")) || []
          console.log(JSON.parse(localStorage.getItem("counter")), "counter", res.event.name, this.id)
         
          const checkUsername = obj => obj.id === this.id;

          if (data.some(checkUsername)) {
            let obj = data.find((o, i) => {
              if (o.id === this.id) {
                // this.noteValue = o.value;
                data[i] = { id: this.id, value:this.noteValue  ,  time: new Date().valueOf() };
                return true; // stop searching
              }
            });
          }
          else {
            data.push({
              id: this.id - 1,
              time: new Date().valueOf(),
              value: this.noteValue || "Hello"
            })
          }


         
          localStorage.setItem("data", JSON.stringify(data))
          console.log("data", data);
          // this.id = this.id + 1
          this.router.navigate(["/dashboard/" + this.id]);
          this.noteValue = ""
          this.broadcast.publish({
            name: 'getdata',
          
          });
        }

      }, 0)


    });




  }
  ngOnDestroy() {
    // this.broadcast.unsubscribeListener(this.broadcastListener);
    this.emailBroadcastListner.unsubscribe();

  }


}
