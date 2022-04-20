import {Component} from "@angular/core";
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Label, LabelService} from "./label.service";

@Component({
  templateUrl: './label-edit-modal.component.html',
  styleUrls: [ './label-edit-modal.component.css']
})
export class LabelEditModal {
    key: string
    languages: string[];
    labels: Label[]

    constructor(private labelService: LabelService, public activeModal: BsModalRef) {
        this.languages = labelService.languages
    }

    public setKey(key: string) {
        this.key = key
        this.labelService.getMultilingualLabel(key).subscribe(f => this.labels = f)
    }

    private getLabel(lang: string) {
        let found = this.labels.find(l => l.lang === lang)
        if (found) {
            return found;
        } else {
            return new Label(this.key, null, null, lang)
        }
    }

}
