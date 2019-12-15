const expect = require('chai').expect;

it('should add numbers', function(){
    const num = 2;
    const num2 = 3;

    expect(num + num2).to.equal(5);
})

it('should add numbers to 6', function(){
    const num = 2;
    const num2 = 3;

    expect(num + num2).not.to.equal(6);
})