import {
  Component,
  OnInit,
  HostListener,
} from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { BroadcastService } from "../../services";
const MOBILE_SCREEN = 768;

@Component({
  selector: "layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  currentPageTitle: string = "";
  setLayout: boolean = true;
  collapseSidebar: boolean = false;
  public centerList: Array<string>;
  selectedCenterName;
  innerWidth: number;
  isMobileScreen = false;
  isCollapseSidebarOpen;
  count: any = 0;

  @HostListener("window:resize", ["$event"])
  @HostListener("window:load", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.isMobileScreen = this.innerWidth <= MOBILE_SCREEN ? true : false;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private broadcast: BroadcastService,
  ) {
  }

  ngOnInit() {
    this.count = 0;
    this.count = JSON.parse(localStorage.getItem("counter"));
  }
  getvalue(e) {
    this.broadcast.publish({
      name: 'search',
      data: e.target.value,
    });

  }
  addTask() {
    this.count = this.count + 1;
    console.log(this.count, "this.count");
    localStorage.setItem("counter", JSON.stringify(this.count))
    this.router.navigate(["/dashboard/" + this.count]);
    this.broadcast.publish({
      name: 'add',
      data: this.count,
    });
  }
  saveTask() {
    this.broadcast.publish({
      name: 'save',
      data: this.count,
    });
  }
  deleteTask() {
    let id = JSON.parse(localStorage.getItem("selected"))
    let data = JSON.parse(localStorage.getItem("data"))
    data = data.filter(function (obj) {
      return obj.id !== id;
    });
    localStorage.setItem("data", JSON.stringify(data))
    this.broadcast.publish({
      name: 'getdata',
    });
    localStorage.removeItem("selected")

  }
  
  toggleSidebar() {
    this.collapseSidebar = !this.collapseSidebar;
    this.isCollapseSidebarOpen = true;
  }



  goState() {
    location.reload();
  }

  closeSidebar(evt) {
    if (this.isMobileScreen && !evt) {
      if (this.collapseSidebar && !this.isCollapseSidebarOpen) {
        this.collapseSidebar = false;
      }
    }

    this.isCollapseSidebarOpen = false;
  }
}
