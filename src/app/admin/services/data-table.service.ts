import { Directive, EventEmitter, Input, Output, Injectable, ElementRef, Renderer2, PipeTransform } from '@angular/core';
import { Product } from 'src/app/shared/models/product/product.model';

// main functionalities of these are taken from ng-bootstrap visit for more understanding

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class NgbdSortableHeader {

    @Input() sortable: string;
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  
    // used for sorting and rotating the items (desc or asc) and also adding up or down arrow
    rotate() {
      this.direction = rotate[this.direction];
      this.sort.emit({column: this.sortable, direction: this.direction});
      let part = this.elementRef.nativeElement.querySelector('.fa');
      if(this.direction == 'asc'){
        this.renderer.addClass(part, "fa-arrow-down");
      }else if(this.direction == 'desc'){
        this.renderer.removeClass(part, 'fa-arrow-down')
        this.renderer.addClass(part, "fa-arrow-up");
      }else {
        this.renderer.removeClass(part, 'fa-arrow-up')
      }
      
    }
}

@Injectable()
export class TableService {
  // sorting function
    SortPrd(products: Product[], {column, direction}: SortEvent) {
        if (direction === '') {
            return products;
        } else {
            return products.sort((a, b) => {
                const res = compare(a[column], b[column]);
                return direction === 'asc' ? res : -res;
            });
        }
    }

    // searching and returning the filtered products according to the keyword
    search(text: string, pipe: PipeTransform, products: Product[]) {
      return products.filter(product => {
        const term = text.toLowerCase();
        return product.title.toLowerCase().includes(term)
            || product.categoryName.toLowerCase().includes(term);
      });
    }
 }