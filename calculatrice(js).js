let currentDisplay = '0'; // Stocke la chaîne de caractères affichée
const displayElement = document.getElementById('display'); // Récupère l'élément d'affichage

// Met à jour l'affichage de la calculatrice
function updateDisplay() {
    displayElement.innerText = currentDisplay;
}

// Ajoute un caractère à l'affichage
function appendToDisplay(char) {
    // Si l'affichage est '0' et que le caractère n'est pas un opérateur ou un point,
    // on remplace le '0' initial. Sinon, on ajoute le caractère.
    if (currentDisplay === '0' && char !== '.' && !isOperator(char)) {
        currentDisplay = char;
    } else {
        // Empêche d'ajouter plusieurs points décimaux dans le même nombre
        if (char === '.' && currentDisplay.includes('.')) {
            const lastChar = currentDisplay[currentDisplay.length - 1];
            if (isOperator(lastChar)) {
                 currentDisplay += '0.';
            } else {
                return;
            }
        }
        // Empêche d'ajouter un opérateur si le dernier caractère est déjà un opérateur
        const lastChar = currentDisplay[currentDisplay.length - 1];
        if (isOperator(char) && isOperator(lastChar)) {
            // Remplace l'ancien opérateur par le nouveau
            currentDisplay = currentDisplay.slice(0, -1) + char;
        } else {
            currentDisplay += char;
        }
    }
    updateDisplay();
}

// Vérifie si un caractère est un opérateur
function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

// Efface l'affichage
function clearDisplay() {
    currentDisplay = '0';
    updateDisplay();
}

// Calcule le résultat de l'expression
function calculateResult() {
    try {
        let result = eval(currentDisplay);

        if (isNaN(result) || !isFinite(result)) {
            currentDisplay = 'Erreur';
        } else {
            if (result.toString().length > 12) {
                result = parseFloat(result.toFixed(8));
            }
            currentDisplay = result.toString();
        }
    } catch (e) {
        currentDisplay = 'Erreur';
    }
    updateDisplay();
}

// Initialisation de l'affichage au chargement
updateDisplay();