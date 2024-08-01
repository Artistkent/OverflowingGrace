export interface Property {
    name: string | number | readonly string[] | undefined;
    price: string | number | readonly string[] | undefined;
    description: string | number | readonly string[] | undefined;
    url: Array<string> ;
    alt?: string | undefined;
    location?:string | undefined;
  }

  export interface PropertyWithId extends Property {
    id?: string;
}
