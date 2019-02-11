import {Inject, Injectable} from '@angular/core';
import {LabelConfig} from "./label.config";
import {BehaviorSubject} from "rxjs";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {ajax} from "rxjs/observable/dom/ajax";


export class Label {
    constructor(public key: string, public value: string, public help: string, public lang: string) {
    }
}

@Injectable()
export class LabelService {

    private labels: Subject<Label[]> = new BehaviorSubject([])
    private loaded: boolean = false;

    public lang: BehaviorSubject<string>;

    constructor(@Inject('config') public config: LabelConfig) {
        this.lang = new BehaviorSubject<string>(this.languages[0])

        this.lang.mergeMap(l => {
            let get$ = ajax({
                url: this.labelSourceUrl + this.urlPrefix + l + this.urlSuffix,
                method:'GET'
            }).map(e => e.response);
            return get$.toPromise()
        })
            .map((res: Promise<any>) => res)
            .map((res: any) => {
                const l = this.labels.next(res)
                this.loaded = true
                return l
            })
            .catch((error: any) => {
                console.log("Error in here " + error)
                return Observable.throw(error);
            })
            .subscribe()
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

    update(label: Label): Observable<{}> {
        let put$ = ajax({
            url: this.labelSourceUrl + "/label",
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: label
        }).map(e => e.response);
        return put$;
    }

    getLabel(key: string): Observable<Label> {
        return this.labels.map(labels => labels[key]).map(function (l) {
            return l
        })
    }

    refreshLabels() {
        this.changeLang(this.lang.getValue())
    }

    getMultilingualLabel(key: string): Observable<any> {
        let get$ = ajax({
            url: this.labelSourceUrl + "/label/" + key,
            method:'GET'
        }).map(e => e.response);
        return get$;
    }


}
