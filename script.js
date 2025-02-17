const inputBill = document.getElementById("numero");
const inputPessoas = document.getElementById("pessoas");
const buttonsTip = document.querySelectorAll(".options-tip li");
const buttonCustomTip = document.querySelector(".input-select-tip");
const buttonReset = document.querySelector(".button-reset");
const paraText = document.querySelector(".error-input-people p");
const tipPerPersonText = document.querySelector(".value-tip-amount");
const totalPerPersonText = document.querySelector(".value-total");
const valueInputPessoas = +inputPessoas.value;

// Função principaç
calculoButton();

// se buttonCustomTip, entao realiza calculo com porcentagem custom
calculoCustomInput(inputPessoas.value);

function calculoButton() {
  buttonsTip.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      // Limpa o campo buttonCustomTip para realizar o cálculo quando clicar nas porcentagens
      buttonCustomTip.value = "";

      const valueBill = +inputBill.value;
      const valuePessoas = +inputPessoas.value;
      if (valuePessoas === 0) {
        paraText.innerText = "Can't be zero";
        inputPessoas.classList.add("msgError");
      } else {
        paraText.innerText = "";
        inputPessoas.classList.remove("msgError");
        // Realiza o cálculo se o campo personalizado estiver vazio
        percorreButton(item, valueBill, valuePessoas);
        if (event.target === item) {
          removeCorButton(buttonsTip);
          item.classList.add("currentButton");
        }
      }
    });
  }); // Aqui você precisa fechar o forEach corretamente
} // Agora a chave da função está fechada corretamente

function percorreButton(item, valueBill, valuePessoas) {
  // Retorna o valor que o usuário clicou
  const valuePorc = +item.innerText.replace("%", "");

  switch (valuePorc) {
    case 5:
      calculaTip(valuePorc, valueBill, valuePessoas);
      break;
    case 10:
      calculaTip(valuePorc, valueBill, valuePessoas);
      break;
    case 15:
      calculaTip(valuePorc, valueBill, valuePessoas);
      break;
    case 25:
      calculaTip(valuePorc, valueBill, valuePessoas);
      break;
    case 50:
      calculaTip(valuePorc, valueBill, valuePessoas);
      break;
    default:
      break;
  }
}

function removeCorButton(button) {
  button.forEach((item) => {
    if (item.classList.contains("currentButton")) {
      item.classList.remove("currentButton");
    }
  });
}

function calculoCustomInput() {
  buttonCustomTip.addEventListener("blur", (event) => {
    const valueBill = +inputBill.value;
    const valuePessoas = +inputPessoas.value;
    const valueInputCustom = +buttonCustomTip.value;
    removeCorButton(buttonsTip);
    if (valuePessoas === 0) {
      paraText.innerText = "Can't be zero";
      inputPessoas.classList.add("msgError");
    } else {
      paraText.innerText = "";
      inputPessoas.classList.remove("msgError");
      calculaTip(valueInputCustom, valueBill, valuePessoas);
    }
  });
}

// cálculo de valores
function calculaTip(valuePorc, valueBill, valuePessoas) {
  // Retorna gorjeta
  const totalTip = valueBill * (valuePorc / 100);

  // Retorna total da conta + gorjeta
  const totalWithTip = valueBill + totalTip;

  // Retorna total + gorjeta / quantidade de pessoas
  const totalPerPerson = totalWithTip / valuePessoas;

  tipPerPersonText.innerText = `$${totalTip.toFixed(2)}`;
  totalPerPersonText.innerText = `$${totalPerPerson.toFixed(2)}`;
}

// Reseta todos os valores
buttonReset.addEventListener("click", (event) => {
  tipPerPersonText.innerText = `$0.00`;
  totalPerPersonText.innerText = `$0.00`;
  inputPessoas.value = "";
  inputBill.value = "";
  buttonCustomTip.value = "";
  paraText.innerText = "";
  inputPessoas.classList.remove("msgError");
});
