export class LabelConfig {
  constructor(public languages: string[],
              public appName: string,
              public labelSourceUrl: string,
              public urlPrefix : string,
              public urlSuffix : string,
              public prod: boolean
              ){
  }
}
