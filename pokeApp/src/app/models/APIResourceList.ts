export interface APIResourceList {
    count: number;
    next: string;
    previous: string;
    results: MainResultModel[];
}
export interface MainResultModel {
    name: string;
    url: string;
}
