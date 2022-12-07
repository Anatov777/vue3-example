import type { CataasModel, CatModel } from '@/models/CataasModel'

export default function useCataas(): CataasModel {
  const getCats = async (): Promise<CatModel[] | undefined> => {
    try {
      const url: string = 'https://cataas.com/api/cats?limit=1000';
      let response: Response = await fetch(url);
      return response.json();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getCatSay = async (
    text: string = 'Hello'
  ): Promise<any> => {
    try {
      const url: string = `https://cataas.com/cat/says/${text}?json=true`;
      let response: Response = await fetch(url);
      return response.json();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    getCats,
    getCatSay,
  };
}
