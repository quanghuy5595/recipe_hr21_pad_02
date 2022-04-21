// import { Component, OnInit } from "@angular/core";
// import { SimpleModalComponent } from "ngx-simple-modal";
// export interface ConfirmModel {
//   title: string;
//   message: string;
// }
// @Component({
//   selector: "app-confirm",
//   templateUrl: "./confirm.component.html",
//   template: `
//     <div class="modal-content">
//       <div class="modal-header">
//         <h4>{{ title || "Confirm" }}</h4>
//       </div>
//       <div class="modal-body">
//         <p>{{ message || "Are you sure?" }}</p>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-outline-danger" (click)="close()">
//           Cancel
//         </button>
//         <button type="button" class="btn btn-primary" (click)="confirm()">
//           OK
//         </button>
//       </div>
//     </div>
//   `,
//   styleUrls: ["./confirm.component.scss"],
// })
// export class ConfirmComponent implements OnInit {
//   constructor() {}

//   ngOnInit() {}
// }

import { Component } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
export interface ConfirmModel {
  title: string;
  message: string;
}
@Component({
  selector: "confirm",
  template: `
    <div class="modal-content ">
      <div class="modal-header">
        <h4>{{ title || "Confirm" }}</h4>
      </div>
      <div class="modal-body">
        <p>{{ message || "Are you sure?" }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger" (click)="close()">
          Cancel
        </button>
        <button type="button" class="btn btn-primary" (click)="confirm()">
          OK
        </button>
      </div>
    </div>
  `,
})
export class ConfirmComponent
  extends SimpleModalComponent<ConfirmModel, boolean>
  implements ConfirmModel
{
  title: string;
  message: string;
  constructor() {
    super();
  }
  confirm() {
    // we set modal result as true on click on confirm button,
    // then we can get modal result from caller code
    this.result = true;
    this.close();
  }
}
