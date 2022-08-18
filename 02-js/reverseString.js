// Reverse a string
let newString = '';

function reverseString(string) {
    const resposta = [];
    for (let index = string.length - 1; index >= 0; index--) {
        resposta.push(string[index]);
    }
    return resposta.join('');
}

console.log(reverseString('👯👻👸'));
console.log(reverseString('amolaP'));

function reverseStringEmoji(string) {
    return [...string].reverse().join('');
}

console.log(reverseStringEmoji('👯👻👸'));
console.log(reverseStringEmoji('amolaP'));