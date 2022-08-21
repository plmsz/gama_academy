const buttons = document.querySelectorAll(".button");
const operation = document.querySelector(".calc-operation");
const calcTyped = document.querySelector(".calc-typed");
const errorSpan = document.querySelector(".operationError");

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        errorSpan.textContent = null
		if (e.target.id === "CE") {
			clearAll();
			return;
		}
		if (e.target.id === "C") {
			clear();
			return;
		}
		if (e.target.id === "back") {
			goBack();
			return;
		}
		if (e.target.id === "=") {
			const expression = operation.textContent.replaceAll("x", "*");
			const isValid = validExpression(expression);
			if (!isValid.valid) {
                errorSpan.textContent = isValid.error;
				operation.textContent = null
				return;
			}
			isValid.valid && doCalc(expression);
			return;
		}
		showTypedButton(e.target.id);
	});
});
//max 20 caracteres => ellipse
//70 caracteres => mostra quadrado e não mostra o resultados aparece quadrado
function validExpression(expression) {
	if (expression.includes("/0")) {
		return { valid: false, error: "Não é possível dividir por zero" };
	}
	return { valid: true, error: "" };
}

function showTypedButton(typed) {
	operation.textContent += typed;
}

function doCalc(expression) {
	const answer = eval(expression);
	calcTyped.textContent = answer;
}
function clearAll() {
	operation.textContent = null;
	calcTyped.textContent = null;
}
function clear() {
	console.log("limpar");
}
function goBack() {
	console.log("voltar");
}
