import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
})
export class SearchInputComponent implements OnInit {
  @Input() foundResult: any = {};
  @Output() onSearchText = new EventEmitter();
  @Output() onSearchTextInput = new EventEmitter();

  searchStream = new Subject<string>();

  myForm = new FormGroup({
    searchInput: new FormControl(""),
  });

  onSubmit() {
    this.onSearchText.emit(this.myForm);
  }

  onSearchInput() {
    this.searchStream.next(this.myForm.value.searchInput);
  }

  ngOnInit() {
    this.searchStream
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((string) => {
        this.onSearchTextInput.emit(string);
      });
  }
}
