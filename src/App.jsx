import { useState, useEffect } from 'react';
import './App.css';

function App(){

  const [gastos, setGastos] = useState([]); //estado para armazenar a lista de gastos
  const [nomeGasto, setNomeGasto] = useState(''); //estado para controlar o valor do input de nome do gasto
  const [total, setTotal] = useState(0);// estado para o total de gastos

  //funcao para adicionar um novo gasto
  const adicionarGasto = () => {//verifica se a variável nomeGasto está vazia ou só com espaços em branco.
    if(nomeGasto.trim() === ''){ //.trim() remove os espaços do início e do fim da string.
      alert("Por favor, digite o nome do gasto.");
      return;
    }

  const precoString = prompt("Digite o preço do produto: "); //aqui o usuario pode digitar de qualquer jeito, depois vamos pegar o flat doq o usuario digitou
  if (precoString === null || precoString.trim() === ""){
      alert("Preço não informado. O produto não foi adicionado.");
      return;
  }

  const precoNumero = parseFloat(precoString.replace(",", "."));//aqui vou transformar aquele precoString q armazenamos do usuario para uma variavel float
  if(isNaN(precoNumero) || precoNumero < 0){ //isNaN significa "not a number", entao ele verifica se o valor nao é um número
    alert("Digite um valor numérico válido e positivo para o preço.");
    return;
  }


//-----------------------






  }


}