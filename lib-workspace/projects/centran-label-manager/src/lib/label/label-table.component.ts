import {Component, OnInit, TemplateRef} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {LabelTableService} from "./labelTable.service";
import {PaginationInstance} from "ngx-pagination";
import {Label, LabelService} from "./label.service";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'label-table',
  templateUrl: './label-table.component.html',
  styleUrls:['./label-table.component.css']
})
export class LabelTable implements OnInit{

  languages: string[] = [];
  keys: string[] = [];
  labels: Label[];
  modalRef: BsModalRef;

  keyForEdit:string=null;

  nbrItemsPerPages = [5,10,25,50,100,500,1000];

  public config: PaginationInstance = {
    itemsPerPage: 5,
    currentPage: 1
  };

  constructor(private modalService: BsModalService,private labelService: LabelService, private labelTableService:LabelTableService, private fb: FormBuilder) {
    this.languages = labelService.languages;
  }

  ngOnInit(){
  }



  show(template: TemplateRef<any>) {
    this.keys = [];
    this.labelTableService.getData().subscribe(data => {
      this.labels = data;
      for(let e in this.labels){
        if( !this.keys.includes(this.labels[e].key))
        this.keys.push(this.labels[e].key);
      }
      this.modalRef = this.modalService.show(template,{class: 'gray modal-lg modal-xl min-size'});
    }, error => {
      console.error("Error loading labels :" +error);
    });
  }

  edit(value:string){
    this.keyForEdit = value;
  }

  addLabel(value:string){
    this.labelService
      .update(new Label(value, "TO_BE_CHANGED", null, 'FR'))
      .subscribe(
        null,
        (e) => console.error("error", e),
        () => {
            this.labelService.refreshLabels();
            this.back()
        }
      )
  }

  back(){
    this.keyForEdit = null;
    this.keys = [];
    this.labelTableService.getData().subscribe(data => {
      this.labels = data;
      for(let e in this.labels){
        if( !this.keys.includes(this.labels[e].key))
        this.keys.push(this.labels[e].key);
      }
    }, error => {
      console.error("Error loading labels :" +error);
    });
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  getLabel(key:string, lang: string) {
    let found;
    for(let e of this.labels){
      if( e.key === key && e.lang === lang){
        found = e;
      }
    }
    if (found) {
      return found;
    } else {
      return new Label(key, null, null, lang)
    }
  }

  close(){
    this.keyForEdit = null;
    this.modalRef.hide()
  }

}
