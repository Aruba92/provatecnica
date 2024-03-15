
export class APIPokemonService {
    
    public APIcallLimit (setData:any, urlParam:string) {
        fetch('https://pokeapi.co/api/v2/pokemon'+urlParam)
            .then(response => response.json())
            .then(json => setData(json.results))
            .catch(error => console.error(error));
    }

    public APIcallPokemon (setData:any, urlParam:string) {
        fetch('https://pokeapi.co/api/v2/pokemon'+urlParam)
            .then(response => response.json())
            .then(json => setData(json.forms[0]))
            .catch(error => console.error(error));
    }
}