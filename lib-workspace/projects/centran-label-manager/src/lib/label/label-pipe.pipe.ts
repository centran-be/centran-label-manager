import {Pipe, PipeTransform} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {LabelService} from "./label.service";


@Pipe({name: 'label'})
export class LabelPipe implements PipeTransform {
  constructor(private labelService: LabelService) {

  }

  transform(key: string): Observable<string> {
    return this.labelService.getLabel(key).pipe(
      map(l => ((l) ? l.value : key))
    )
  }
}
