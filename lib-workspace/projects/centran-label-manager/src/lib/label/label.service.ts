import {Inject, Injectable} from '@angular/core';
import {LabelConfig} from './label.config';
import {BehaviorSubject} from 'rxjs';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import { of } from 'rxjs';
import {ajax} from 'rxjs/ajax';
import { concatMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';



export class Label {
    constructor(public key: string, public value: string, public help: string, public lang: string) {
    }
}

@Injectable()
export class LabelService {

    private labels: Subject<Label[]> = new BehaviorSubject([]);
    private loaded = false;
    private _showKeys = false;

    public lang: BehaviorSubject<string>;

    constructor(@Inject('config') public config: LabelConfig) {
        this.lang = new BehaviorSubject<string>(this.languages[0]);
        this.lang.pipe(
          concatMap(l => {
            let get$ = ajax({
                url: this.labelSourceUrl + this.urlPrefix + l + this.urlSuffix,
                method: 'GET'
            }).pipe(map(e => e.response));
            return get$.toPromise();
          }),
          map((res: Promise<any>) => res),
          map((res: any) => {
                const l = this.labels.next(res)
                this.loaded = true
                return l
            }),
          catchError((error: any) => {
                console.log("Error in here " + error)
                return of(error);
            })

      ).subscribe()
    }

    public get languages(): string[] {
        return this.config.languages;
    }

    public get appName(): string {
        return this.config.appName;
    }

    public get labelSourceUrl(): string {
        return this.config.labelSourceUrl;
    }

    public get prod() : boolean {
        return this.config.prod;
    }

    public get urlPrefix() : string {
        return this.config.urlPrefix;
    }

    public get urlSuffix(): string {
        return this.config.urlSuffix;
    }

    public changeLang(lang: string) {
        this.lang.next(lang)
    }


    get showKeys(): boolean {
        return this._showKeys;
    }

    set showKeys(value: boolean) {
        this._showKeys = value;
    }

    update(label: Label): Observable<{}> {
        let put$ = ajax({
            url: this.labelSourceUrl + "/label",
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: label
        }).pipe(map(e => e.response));
        return put$;
    }

    getLabel(key: string): Observable<Label> {
        return this.labels.pipe(
          map(labels => labels[key]),
          map(function (l) {
            return l
          })
        )
    }

    refreshLabels() {
        this.changeLang(this.lang.getValue())
    }

    getMultilingualLabel(key: string): Observable<any> {
        let get$ = ajax({
            url: this.labelSourceUrl + "/label/" + key,
            method:'GET'
        }).pipe(
          map(e => e.response)
        )
        return get$;
    }


}
