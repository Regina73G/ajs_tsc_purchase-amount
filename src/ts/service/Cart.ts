import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        this._items.push(item);
    }

    get items(): Buyable[] {
        return [...this._items]; 
    }

    calculateAmount(): number {
        return this._items.reduce((sum: number, item: Buyable) => sum + item.price, 0);
    }
    
    calculateAmountAfterDiscount (discount: number): number {
        const summ: number = this.calculateAmount();
        return summ - (summ * discount);
    }

    removeProduct(deletedProduct: number ): void {
        this._items = this._items.filter((obj: Buyable) => obj.id !== deletedProduct);
    }
}