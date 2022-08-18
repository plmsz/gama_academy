// Divisível por 3 => 'Fizz'
// Divisível por 5 => 'Buzz'
// Divisível por 3 e 5 => 'FizzBuzz'
// Se não é dívisível por 3 ou 5 => entrada
// Se não é número =>'Não é número'


function fizzBuzz(entrada) {
    if (typeof (entrada) !== 'number') return 'Não é número';

    const divisivelPorTres = entrada % 3 === 0 ? 'Fizz' : '';
    const divisivelPorCinco = entrada % 5 === 0 ? 'Buzz' : '';
    const response = divisivelPorTres + divisivelPorCinco;

    if (!divisivelPorCinco && !divisivelPorTres) return entrada;
    if (divisivelPorCinco || divisivelPorTres) return response;
}

console.log(fizzBuzz('iijio'));
console.log(fizzBuzz('5'));
console.log(fizzBuzz(true));
console.log(fizzBuzz(28));
console.log(fizzBuzz(12));
console.log(fizzBuzz(10));
console.log(fizzBuzz(15));
