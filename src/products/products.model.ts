// Data formating for the product type
// public essentially saves mapping data inside the constructor like this.id=id;

export class Product {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
  ) {}
}
