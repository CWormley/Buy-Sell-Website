const {sum, substraction} = require('../src/functions');

describe("Test on sum function", () => {
    test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3);
    });
    
    test('adds -1 + -2 to equal -3', () => {
        expect(sum(-1, -2)).toBe(-3);
    });
    
    test('adds -1 + 2 to equal 1', () => {
        expect(sum(-1, 2)).toBe(1);
    });
    
    test('adds 1 + -2 to equal -1', () => {
        expect(sum(1, -2)).toBe(-1);
    });
    
    test('adds 0 + 0 to equal 0', () => {
        expect(sum(0, 0)).toBe(0);
    });
})

describe("Test on substraction function", () => {
    test('substract 1 - 2 to equal -1', () => {
      expect(substraction(1, 2)).toBe(-1);
    });
    
    test('substract -1 - -2 to equal 1', () => {
        expect(substraction(-1, -2)).toBe(1);
    });
    
    test('substract -1 - 2 to equal -3', () => {
        expect(substraction(-1, 2)).toBe(-3);
    });
    
    test('substract 1 - -2 to equal 3', () => {
        expect(substraction(1, -2)).toBe(3);
    });
    
    test('substract 0 - 0 to equal 0', () => {
        expect(substraction(0, 0)).toBe(0);
    });
})
