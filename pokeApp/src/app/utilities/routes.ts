export class Routes {
    // tslint:disable-next-line: no-inferrable-types
    public Base: string = 'https://pokeapi.co/api/v2';

    public ImgRoute(id): string {
        return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    }
}
