let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
// let price = 19.5;
// let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");

let currencies = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
];

purchaseBtn.addEventListener("click", () => {
    //lógica

    const cashValue = parseFloat(cash.value);
    const change = cashValue - price;

    if (cashValue < price){
      alert("Customer does not have enough money to purchase the item");
      return;
    }

    if (cashValue === price){
      changeDue.innerText = "No change due - customer paid with exact cash";
      return;
    }

    const resultadoTroco = getChangeValue(change, cid);

    if (resultadoTroco.status === "INSUFFICIENT_FUNDS" || resultadoTroco.status === "CLOSED") {
      changeDue.innerText = `Status: ${resultadoTroco.status} ${formatarTroco(resultadoTroco.change)}`;
    }else {
      changeDue.innerText = `Status: OPEN ${formatarTroco(resultadoTroco.change)}`;
    }
});

const getChangeValue = (changeDue, caixa) => {
    //o _ ocupa o [0] que não vou usar
    let totalCaixa = parseFloat(caixa.reduce((accumulator, [_,val]) => accumulator + val, 0)).toFixed(2);

    //se não houver dinheiro na caixa para o troco
    if (totalCaixa < changeDue){
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    let trocoArray = [];
    let trocoEmFalta = changeDue;

    //iteração backwards
    for (let i = currencies.length - 1; i >= 0; i--) {
      let unidade = currencies[i][0]; //strings
      let unidadeValor = currencies[i][1]; //segunda posição -> valores
      let unidadeCaixa = cid[i][1]; //quantidade na caixa

      if (unidadeValor <= trocoEmFalta && unidadeCaixa > 0){
        let quantidadeDaUnidade = 0;

        do {
          trocoEmFalta = (trocoEmFalta - unidadeValor).toFixed(2);
          unidadeCaixa -= unidadeValor;
          quantidadeDaUnidade += unidadeValor;

        } while(trocoEmFalta >= unidadeValor && unidadeCaixa > 0);

        if (quantidadeDaUnidade > 0){
          trocoArray.push([unidade, quantidadeDaUnidade]);
        }
      }
    }

    if (trocoEmFalta > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    
    if (changeDue.toFixed(2) === totalCaixa){
      return { status: "CLOSED", change: caixa };
    }
    
    return { status: "OPEN", change: trocoArray }
}

const formatarTroco = trocoArray2 => trocoArray2.map(([unidade, quantidade]) => quantidade>0? `${unidade}: \$${quantidade.toFixed(2)}`:"").join(" ");