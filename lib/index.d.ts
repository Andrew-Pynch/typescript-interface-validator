export interface IPerson {
    name: string;
    age: number;
    weight: number;
}
export declare function createKeys<T>(keyRecord: Record<keyof T, any>): (keyof T)[];
export declare function validator<T>(type: T): true | string[];
