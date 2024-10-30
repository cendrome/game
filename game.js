let cryptoAmount = 0;
let cashAmount = 0;
let exchangeRate = 1;
let miningRigCount = 0;
let workerCount = 0;

// Buffs from prestige
let miningBuff = 1;

// Sound effects
const mineSound = document.getElementById('mine-sound');
const sellSound = document.getElementById('sell-sound');

// Function to update display
function updateDisplay() {
    document.getElementById('crypto-amount').innerText = cryptoAmount.toFixed(2);
    document.getElementById('cash-amount').innerText = cashAmount.toFixed(2);
    document.getElementById('exchange-rate').innerText = exchangeRate.toFixed(2);
}

// Function to mine cryptocurrency
function mineCrypto() {
    const miningOutput = (miningRigCount * 0.1 + workerCount * 0.05) * miningBuff; // Example output
    cryptoAmount += miningOutput;
    mineSound.play(); // Play mining sound
    updateDisplay();
}

// Function to sell cryptocurrency for cash
function sellCrypto() {
    if (cryptoAmount > 0) {
        cashAmount += cryptoAmount * exchangeRate;
        cryptoAmount = 0;
        sellSound.play(); // Play selling sound
        updateDisplay();
    }
}

// Function to buy a mining rig
function buyRig() {
    if (cashAmount >= 10) {
        cashAmount -= 10;
        miningRigCount++;
        updateDisplay();
    }
}

// Function to hire a worker
function hireWorker() {
    if (cashAmount >= 50) {
        cashAmount -= 50;
        workerCount++;
        updateDisplay();
    }
}

// Prestige function
function prestige() {
    if (cashAmount >= 100) {
        cashAmount = 0;
        cryptoAmount = 0;
        miningRigCount = 0;
        workerCount = 0;
        exchangeRate = 1; // Reset to default
        miningBuff *= 1.5; // Increase mining efficiency
        updateDisplay();
    }
}

// Simulate market changes
function simulateMarket() {
    setInterval(() => {
        exchangeRate = Math.random() * (3 - 0.5) + 0.5; // Random rate between 0.5 and 3
        updateDisplay();
    }, 5000); // Update every 5 seconds
}

// Game loop
setInterval(() => {
    mineCrypto();
}, 1000); // Mine every second

// Event listeners
document.getElementById('buy-rig').addEventListener('click', buyRig);
document.getElementById('hire-worker').addEventListener('click', hireWorker);
document.getElementById('prestige-button').addEventListener('click', prestige);

// Start the market simulation
simulateMarket();

// Load game state from localStorage
function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem('cryptoMiningGame'));
    if (savedGame) {
        cryptoAmount = savedGame.cryptoAmount;
        cashAmount = savedGame.cashAmount;
        exchangeRate = savedGame.exchangeRate;
        miningRigCount = savedGame.miningRigCount;
        workerCount = savedGame.workerCount;
        miningBuff = savedGame.miningBuff;
        updateDisplay();
    }
}

// Save game state to localStorage
function saveGame() {
    const gameState = {
        cryptoAmount,
        cashAmount,
        exchangeRate,
        miningRigCount,
        workerCount,
        miningBuff,
    };
    localStorage.setItem('cryptoMiningGame', JSON.stringify(gameState));
}

// Automatically save the game every 10 seconds
setInterval(saveGame, 10000);

// Load game when the page is refreshed
loadGame();
