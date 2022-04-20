import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Label} from "./label.service";

@Component({
  selector: 'label-edit-table',
  templateUrl: './label-edit-table.component.html',
  styleUrls: ['./label-edit-table.component.css']
})
export class LabelEditTable {

    @Input("key")
    key:string;

    @Input("languages")
    languages:string[];

    @Input("labels")
    labels: Label[] = [];

    @Output() onBack = new EventEmitter();

    getLabel(lang: string) {
        let found;
        for( let label of this.labels){
            if( label.key == this.key && label.lang == lang){
                found = label;
            }
        }
        if (found) {
            return found;
        } else {
            return new Label(this.key, null, null, lang)
        }
    }

    goBack(){
        this.onBack.emit();
    }

}

