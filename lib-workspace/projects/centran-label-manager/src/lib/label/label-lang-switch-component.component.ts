import {Component} from "@angular/core";
import {LabelService} from "./label.service";

@Component({
  selector: 'label-lang-switch',
  templateUrl: './label-lang-switch-component.component.html',
})
export class LabelLangSwitchComponent{


    languages: string[] = []

    setLang(lang : any): void {
        this.labelService.changeLang(lang)
    }

    constructor(private labelService: LabelService) {
        this.languages = labelService.languages
    }

    getLangSelected(){
        return this.labelService.lang.getValue();
    }

    getProd(){
        return this.labelService.prod;
    }

    getShowKeys(){
        return this.labelService.showKeys;
    }

    switchShowKeys(){
        this.labelService.showKeys = !this.labelService.showKeys;
    }


}