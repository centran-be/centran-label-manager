import {Component, Input, OnInit} from "@angular/core";
import {LabelEdition, LabelEditionService} from "./labelEdition.service";
import {Observable} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LabelEditModal} from "./label-edit-modal.component";
import {LabelInfoModalComponent} from "../label-info-modal/label-info-modal.component";


@Component({
  selector: 'l',
  templateUrl: './label-component-edition.component.html',
  styleUrls: ['label-component-edition.component.css']
})
export class LabelComponentEdition implements OnInit {
  @Input() key: string;
  @Input() needed : boolean;
  label: Observable<LabelEdition>;
  labelValue: Observable<string>;
  labelHelp: Observable<string>;
  toggleInfo: boolean = false;
  @Input() noInfo : boolean = false;

  constructor(private labelService: LabelEditionService, private modalService: NgbModal) {
  }

  onEdit() {
    const modalRef = this.modalService.open(LabelEditModal, {size: "lg", windowClass: "xxl"});
    modalRef.componentInstance.setKey(this.key)
  }

  toggle() {
    if( this.noInfo === false){
      const modalRef = this.modalService.open(LabelInfoModalComponent,{size:"lg",windowClass:"xxl"});
      modalRef.componentInstance.setLabelHelp(this.labelHelp)
    }
  }

  ngOnInit() {
    this.label = this.labelService.getLabel(this.key)
    this.labelValue = this.label.map(l => ((l) ? l.value : null))
    if( this.noInfo == false)
    this.labelHelp = this.label.map(l => (l) ? l.help : null)
  }
}
