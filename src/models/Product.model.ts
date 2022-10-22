export interface IProduct {
    productName: string,
    id: number,
    tags: Array<string> | [],
    category: string,
    manufacturerUrl: string,
    description: Array<string>,
    option1: string | null,
    option2: string | null
}