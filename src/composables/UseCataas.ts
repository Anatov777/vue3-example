export default function useCataas() {
  const getCats = async () => {
    try {
      const url = 'https://cataas.com/api/cats?limit=1000';
      let response = await fetch(url);
      return response.json()
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getCatSay = async (text: string = 'hello') => {
    try {
      const url = `https://cataas.com/cat/says/${text}?json=true`;
      let response = await fetch(url)
      return response.json()
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    getCats,
    getCatSay,
  };
}
