import {Component, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {BsModalService} from "ngx-bootstrap";
import {Label, LabelService} from "./label.service";
import {LabelEditModal} from "./label-edit-modal.component";


@Component({
  selector: 'l',
  templateUrl: './label-component.component.html',
  styleUrls: ['label-component.component.css']
})
export class LabelComponent implements OnInit {
    @Input() key: string;
    @Input() needed : boolean;
    @Input() parameters: any;
    label: Observable<Label>;
    labelValue: Observable<string>;
    labelHelp: Observable<string>;
    @Input() noInfo : boolean = false;

    constructor(private labelService: LabelService, private modalService: BsModalService) {
    }

    onEdit() {
        if(!this.labelService.prod) {
            const modalRef = this.modalService.show(LabelEditModal, {class: 'gray modal-lg modal-xl'});
            modalRef.content.setKey(this.key)
        }

    }
    ngOnInit() {
        this.label = this.labelService.getLabel(this.key)
        this.labelValue = this.getLabelValue();
        if( this.noInfo == false) {
            this.labelHelp = this.label.map(l => (l) ? l.help : null)
        }

    }


    getLabelValue(){
        return this.label.map(l => ((l) ? l.value : null)).filter(l => l !== null).map(labelTranslated => {
            let message= labelTranslated;
            if( this.parameters != null && this.parameters instanceof Array &&  this.parameters.length > 0){
                for (let _i = 0; _i < this.parameters.length; _i++) {
                    message = message.replace("{"+_i+"}",this.parameters[_i]);
                }
            }
            if ( this.parameters !== null && this.parameters instanceof Map && this.parameters.size > 0){
                this.parameters.forEach((value, key) => {
                    message = message.replace("{" + key + "}",value);
                })
            }
            if ( this.parameters !== null && this.parameters instanceof Object && Object.keys(this.parameters).length > 0){
                console.log("JS OBJECT PARAMETER",this.parameters);
                Object.keys(this.parameters).forEach( (key) => {
                    console.log("KEY",key);
                    message = message.replace( '{' + key + '}', this.parameters[key]);
                })
            }
            return message;
        })
    }
}
