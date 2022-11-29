import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ProfileItem } from "src/app/classes/profile-item";

@Component({
  selector: "app-profile-item",
  templateUrl: "./profile-item.component.html",
  styleUrls: ["./profile-item.component.scss"],
})
export class ProfileItemComponent implements OnInit {
  @Input() extraClasses: string;
  @Input("profile-item") profileItem: ProfileItem;
  @Output() delete = new EventEmitter();

  constructor() {}

  onDelete(event) {
    this.delete.emit(event);
  }
  ngOnInit(): void {}
}
