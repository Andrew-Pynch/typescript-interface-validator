import * as chai from 'chai';
import { InterfaceValidator } from '../src/index';

const expect = chai.expect;

interface IPerson {
    name: string;
    age: number;
    weight?: number;
}

// // console.log('Person is valid?', validPerson);

describe('Interface Validator', () => {
    it('should be true because a valid instance of an interface was supplied', () => {
        const validPerson = {
            name: 'John',
            age: 30,
        };
        const personIsValid = InterfaceValidator<IPerson>(validPerson);
        expect(personIsValid).to.be.true;
    });

    it('should be false because none of the required properties were supplied', () => {
        const personMissingName = {
            weight: 150,
        };
        const personIsValid = InterfaceValidator<IPerson>(personMissingName);
        console.log('Person is valid?', personIsValid);
        expect(personIsValid.length).to.equal(2);
    });
});
