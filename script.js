const MAX_LEVEL = 100;

function calculateBaseCoinPotential(currentCoinPotential, currentLevel) {
    return currentCoinPotential / (((currentLevel - 1) * 0.04) + 1);
}

function calculateCoinPotential(baseCoinPotential, level) {
    return baseCoinPotential * (((level - 1) * 0.04) + 1);
}

function calculateBaseGemPotential(currentGemPotential, currentLevel) {
    return currentGemPotential / (((currentLevel - 1) * 0.025) + 1);
}

function calculateGemPotential(baseGemPotential, level) {
    return baseGemPotential * (((level - 1) * 0.025) + 1);
}

function formatNumber(number) {
    if (number < 1000) {
        return number.toString();
    } else if (number < 1000000) {
        return (number / 1000).toFixed(1) + "K";
    } else if (number < 1000000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else {
        return (number / 1000000000).toFixed(1) + "B";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculatorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const level = parseInt(document.getElementById('level').value);
        const coinMultiplier = parseInt(document.getElementById('coinmultiplier').value);
        const gemMultiplier = parseInt(document.getElementById('gemmultiplier').value);
        const runeValue = document.getElementById('rune').value;

        const baseCoinPotential = calculateBaseCoinPotential(coinMultiplier, level);
        const baseGemPotential = calculateBaseGemPotential(gemMultiplier, level);
        let maxCoinPotential = calculateCoinPotential(baseCoinPotential, MAX_LEVEL);
        let maxGemPotential = calculateGemPotential(baseGemPotential, MAX_LEVEL);

        let runeName = "None";
        if (runeValue) {
            const [runeType, runeMultiplier] = runeValue.split(':');
            if (runeType === "coin") {
                maxCoinPotential *= parseFloat(runeMultiplier);
                runeName = document.getElementById('rune').options[document.getElementById('rune').selectedIndex].text;
            } else if (runeType === "gem") {
                maxGemPotential *= parseFloat(runeMultiplier);
                runeName = document.getElementById('rune').options[document.getElementById('rune').selectedIndex].text;
            }
        }

        document.getElementById('coinPotential').textContent = `${formatNumber(Math.floor(maxCoinPotential))} (${Math.floor(maxCoinPotential)})`;
        document.getElementById('gemPotential').textContent = `${formatNumber(Math.floor(maxGemPotential))} (${Math.floor(maxGemPotential)})`;
        document.getElementById('runeSelected').textContent = runeName;
        document.getElementById('result').style.display = 'block';
        
        // Add class to trigger animation
        document.getElementById('result').classList.add('show');
    });
});