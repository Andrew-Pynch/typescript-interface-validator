export interface IPerson {
    name: string;
    age: number;
    weight: number;
}

export function createKeys<T>(keyRecord: Record<keyof T, any>): (keyof T)[] {
    return Object.keys(keyRecord) as any;
}

export function validator<T>(type: T): true | string[] {
    const errors: string[] = [];

    const keys = createKeys<T>(type);

    for (const key of keys) {
        const value = type[key];
        const expectedType = typeof type[key];
        switch (expectedType) {
            case 'string':
                if (!value || typeof value !== expectedType) {
                    errors.push(
                        `${key} is required and is not ${expectedType}`
                    );
                }
                break;

            case 'number' || 'boolean':
                if (!value || typeof value !== expectedType) {
                    errors.push(
                        `${key} is required and is not ${expectedType}`
                    );
                }
            default:
                if (!value) {
                    errors.push(`${key} is required`);
                }
        }
    }

    return errors.length > 0 ? errors : true;
}

const person: IPerson = {
    name: '',
    age: 18,
    weight: 185,
};
const isValid = validator<IPerson>(person);
console.log(isValid);
