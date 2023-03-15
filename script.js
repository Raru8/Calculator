// Unicode dos caracteres especiais
let divide = '\u00F7';
let backspace = '\uf55a'
let percentage = '\u0025';
let multiplication = '\u00D7';

// Pegando a div do teclado e display de exibição
let keyboard = document.querySelector('.keyboard');
let field = document.querySelector('.screen-display');

// Array dos elementos dos botoões
let numbers = [
    'C', backspace, percentage, divide,
    1, 2, 3, multiplication,
    4, 5, 6, '+',
    7, 8, 9, '-',
    '.', 0, '000', '='];

/* for() para pegar os elementos do array e criar um botão
para cada um, adicionar a class ".number", colocar os valor dentro do botão
e adicionar como filho do ".keyboard" */
for (let i of numbers) {
    let button = document.createElement('button');
    button.classList.add('number');
    button.value = i
    button.innerHTML = i;
    button.setAttribute('id', `element-${i}`)
    keyboard.appendChild(button);
};

// Div de botões e elementos da tela para eventos de clique e retorno de resultados
let btn = document.querySelectorAll('.number');
let historic = document.querySelector('.historic')
let clear = document.querySelector('#element-C')
let btnBackspace = document.querySelector('#element-\uf55a')

/* forEach para pegar todos os botões da div ".number" e atribuir
eventos a ele, e onde o elemento for igual a "=" chama a função
onde são feito os calculos */
btn.forEach((element) => {
    element.addEventListener('click', () => {
        field.value += element.value
        if (element.value == '=')
            checkOperator(field.value)
    });
});

// Evento para limpar todo o display
clear.addEventListener('click', () => {
    clear.value = '';
    field.value = '';
    historic.innerHTML = '';
});

// Evento para apagar, funciona como um backspace
btnBackspace.addEventListener('click', () => {
    const currentValue = field.value;
    const newValue = currentValue.slice(0, -1);
    field.value = newValue;
});

/* Função onde checa o operador usando o 'indexOf' e gera a conta,
para operadores com caracteres especiais usados com unicode, a função 'replace' 
o substitui para o caractere padrão como por exemplo "X > *"  */
function checkOperator(string) {
    if (string.indexOf('=') != -1) {
        let arrString = string.split('=')
        let operation = arrString[0]

        if (operation.indexOf('+') != -1) {
            field.value = eval(operation)
        }

        if (operation.indexOf('-') != -1) {
            field.value = eval(operation)
        }

        if (operation.indexOf('\u00F7') != -1) {
            let newString = operation.replace('\u00F7', '/')
            field.value = eval(newString)
        }

        if (operation.indexOf('\u00D7') != -1) {
            let newString = operation.replace('\u00D7', '*')
            field.value = eval(newString)
        }

        /* Para realizar o cálculo de porcentagem, é necessário primeiramente remover o "%". 
        Em seguida, criamos dois arrays com as partes antes e depois do "%". 
        Em seguida, transformamos os arrays em strings, convertemos em números de ponto flutuante (float) 
        e realizamos o cálculo.  */
        if (operation.indexOf('\u0025') != -1) {
            let index = operation.indexOf('\u0025')
            let arrayString = Array.from(operation)
            arrayString.splice(index, 1)

            let bvArr = arrayString.slice(0, index)
            let pntArr = arrayString.slice(index)

            let base_value = bvArr.join('')
            let percent = pntArr.join('')

            let n1 = parseFloat(base_value)
            let n2 = parseInt(percent)

            let percentage = n2 * (n1 / 100)
            field.value = parseFloat(percentage)
        }

        // Criando um localStorage para salvar o ultimo calculo e exibi-lo em ".historic"
        localStorage.setItem('calculations', operation);
        let item = localStorage.getItem('calculations');
        historic.innerHTML = item
    }
};