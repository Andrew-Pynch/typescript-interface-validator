import { InterfaceValidator } from '../src/index';

interface IPerson {
    name: string;
    age: number;
    weight?: number;
}

const person: IPerson = {
    name: 'Andrew',
    age: 21,
    // weight is nullable, so we don't necessarily expect it to be suplplied
};

const validPerson = InterfaceValidator<IPerson>(person);
// console.log('Person is valid?', validPerson);
