import { useState, useEffect } from 'react';
import './App.css';

function App(){

  const [gastos, setGastos] = useState([]); //estado para armazenar a lista de gastos
  const [nomeGasto, setNomeGasto] = useState(''); //estado para controlar o valor do input de nome do gasto
  const [total, setTotal] = useState(0);// estado para o total de gastos

//-------------------------------


  //funcao para adicionar um novo gasto
  const adicionarGasto = () => {//verifica se a variável nomeGasto está vazia ou só com espaços em branco.
    if(nomeGasto.trim() === ''){ //.trim() remove os espaços do início e do fim da string.
      alert("Por favor, digite o nome do gasto.");
      return;
    }

    const precoString = prompt("Digite o preço do produto: "); //aqui o usuario pode digitar de qualquer jeito, depois vamos pegar o float doq o usuario digitou
    if (precoString === null || precoString.trim() === ""){
        alert("Preço não informado. O produto não foi adicionado.");
        return;
    }

    const precoNumero = parseFloat(precoString.replace(",", "."));//aqui vou transformar aquele precoString q armazenamos do usuario para uma variavel float
    if(isNaN(precoNumero) || precoNumero < 0){ //isNaN significa "not a number", entao ele verifica se o valor nao é um número
      alert("Digite um valor numérico válido e positivo para o preço.");
      return;
    }

    const novoGasto = {
      id: Date.now(), //usando timestamp como id
      nome: nomeGasto,
      preco: precoNumero,
    };

    setGastos([...gastos, novoGasto]); // adiciona o novo gasto à lista
    setNomeGasto(''); // limpa o campo de input
  };

//------------------------------



  // função para deletar um gasto pelo seu ID
  const deletarGasto = (idParaDeletar) => {  
    const novaLista = gastos.filter(gasto => gasto.id !== idParaDeletar);// filtro a lista mantendo apenas os gastos cujo id é diferente do que quero deletar
    setGastos(novaLista);
  };


//----------------------------------

  //funcao para editar um gasto
  const editarGasto = (idParaEditar) => { // encontra o gasto especifico que queremos editar
    const gastoParaEditar = gastos.find(gasto => gasto.id === idParaEditar); //o .find() serve para procurar o gasto com o id igual ao que foi passado
    if(!gastoParaEditar) return;

    // pede os novos valores ao usuário
    const novoNome = prompt("Novo nome: ", gastoParaEditar.nome);
    const novoPrecoString = prompt("Novo preço: ", gastoParaEditar.preco.toString().replace('.',','));

    const nomeAtualizado = novoNome !== null && novoNome.trim() !== ''
      ? novoNome.trim() //usa esse valor se deu certo
      : gastoParaEditar.nome; //se deu errado mantem o nome anterior


    //valida e atualiza o preço
    let precoAtualizado = gastoParaEditar.preco;
    if(novoPrecoString !== null && novoPrecoString.trim() !== ''){
      const novoPrecoNum = parseFloat(novoPrecoString.replace(',', "."));

      if(!isNaN(novoPrecoNum) && novoPrecoNum >= 0){
        precoAtualizado = novoPrecoNum;
      }

      else{
        alert("Valor do preço inválido. O preço não foi alterado.");
      }

    }

    const listaAtualizada = gastos.map(gasto =>   //mapeia a lista de gastos ate encontrar o id correspondente, dps retorna um novo objeto de gasto atualizado
          gasto.id === idParaEditar
          ? {...gasto, nome: nomeAtualizado, preco: precoAtualizado}
          : gasto
    );

    setGastos(listaAtualizada);
  };

//---------------------------------


  useEffect(() => {
    const novoTotal = gastos.reduce((acc, gasto) => acc + gasto.preco, 0);
    setTotal(novoTotal);
  }, [gastos]); // recalcular o total SEMPRE que a lista de gastos for alterada.




return (
    <div className="container">
      <h1>Controle de Gastos</h1>
      
      <div className="gasto">
        <h1>Total de Gastos</h1>
        <span id="gasto">
          R$ {total.toFixed(2).replace('.', ',')}
        </span>
      </div>

      <input
        type="text"
        id="taskInput"
        placeholder="Com o que você gastou?"
        value={nomeGasto}
        onChange={(e) => setNomeGasto(e.target.value)}
      />
      <button onClick={adicionarGasto}>Adicionar</button>
      
      <ul id="taskList">
        {gastos.map((gasto) => (
          <li key={gasto.id}>
            <span>{gasto.nome}</span>
            <span className="preco">
                R${gasto.preco.toFixed(2).replace('.', ',')}
            </span>
            <div>
                <button className="editButton" onClick={() => editarGasto(gasto.id)}>Editar</button>
                <button className="deleteButton" onClick={() => deletarGasto(gasto.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;
