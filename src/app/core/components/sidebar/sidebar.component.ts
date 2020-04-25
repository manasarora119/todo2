import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService, AuthService } from "dlv-ng-auth";
import { BroadcastService } from "../../services";
import { Subscription } from "rxjs";

@Component({
  selector: "sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  currentRoute: any = document.location.href;
  routes: Array<Object> = [];
  option;
  userProfileAvatar: any;
  userProfie: any;
  userFirstName;
  userLastName;
  public avatarBackgroundcolor;
  data: any[];
  dataCopy: any;


  private emailBroadcastListner: Subscription;
  constructor(
    private router: Router,

    private broadcast: BroadcastService
  ) {


  }

  ngOnInit() {
    this.updateLocalStorageData();
    this.router.events.subscribe(data => {
      this.currentRoute = data["url"];
    });
    this.emailBroadcastListner = this.broadcast.listen().subscribe((res) => {
      setTimeout(() => {
        if (res.event.name === 'search') {
          this.search(res.event.data)
        }
      }, 0)
      if (res.event.name === 'getdata') {
        this.updateLocalStorageData()
      }
    });

  }
  getvalue(e) {
    this.broadcast.publish({
      name: 'search',
      data: e.target.value,
    });

  }

  navigate(e) {
    localStorage.setItem("selected", JSON.stringify(e.id))
    this.router.navigate(['/dashboard/' + e.id])
  }
  updateLocalStorageData() {
    let data = JSON.parse(localStorage.getItem("data")) ||  [];
    this.data = data.reverse();
    this.dataCopy = JSON.parse(JSON.stringify(this.data))
  }
  search(search) {
    search = search.toLowerCase();
    if (search && this.data) {
      this.data = this.dataCopy.filter(fe => {
        return fe["value"].toLowerCase().indexOf(search) > -1
      });
    } else {
      this.data = this.dataCopy;
    }
  }
}
