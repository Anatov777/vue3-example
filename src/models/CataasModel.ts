export interface CatModel {
  _id: string;
  tags: string[];
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface CataasModel {
  getCats: () => Promise<CatModel[] | undefined>;
  getCatSay: (text: string) => Promise<any>;
}
