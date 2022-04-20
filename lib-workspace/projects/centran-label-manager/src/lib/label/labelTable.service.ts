import {Injectable} from "@angular/core";
import {Label, LabelService} from "./label.service";
import {Observable} from "rxjs";
import {ajax} from "rxjs/ajax";
import {map} from "rxjs/operators";


@Injectable()
export class LabelTableService {



  constructor(private labelService: LabelService) {

  }

  public getData():Observable<Label[]> {

    let get$ = ajax({
      url: this.labelService.labelSourceUrl + "/label",
        method:'GET'
    }).pipe(
      map(e=> e.response)
    )
    return get$;
  }
}
