import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

    transform(list: any[], value: string) {
        let temp = value ? list.filter(item => item.includes(value)) : list;
        return temp;
    }

}