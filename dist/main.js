'use strict';

function sayHello (name) {
    return `Hello from ${name}`;
}

function cli () {
    console.log('cli');
}

console.log(sayHello('Maria'));
cli();
