// simulation.js

// Updated Preset configurations with detailed scenarios
const presets = {
    "Default": {
        // Balanced game settings
        playerCount: 24,
        simulationDays: 30,
        baseChurnRate: 10,
        learningRate: 0.01,
        progressionSatisfactionWeight: 0.5,
        spendingSatisfactionWeight: 0.5,
        freePlayerRatio: 80,
        spenderRatio: 15,
        whaleRatio: 5,
        dailyReward: 10,
        levelCompletionReward: 5,
        milestoneReward: 50,
        milestoneIntervalType: "linear",
        xpPerDailyReward: 10,
        xpPerLevelCompletion: 20,
        xpPerMilestone: 100,
        baseIapProbability: 10,
        revenuePerPurchase: 4.99,
        creditsPerPurchase: 500,
        boosterCost: 10,
        baseBoosterProbability: 10,
        basePlayProbability: 70,
        costPerPlay: 5
    },
    "High Engagement": {
        // Players are highly engaged
        basePlayProbability: 90,
        baseChurnRate: 5,
        learningRate: 0.02,
        progressionSatisfactionWeight: 0.6,
        spendingSatisfactionWeight: 0.4,
    },
    "Low Monetization": {
        // Players are less willing to spend
        baseIapProbability: 5,
        revenuePerPurchase: 2.99,
        baseBoosterProbability: 5,
        spenderRatio: 10,
        whaleRatio: 2,
    },
    "High Monetization": {
        // Players are more willing to spend
        baseIapProbability: 20,
        revenuePerPurchase: 9.99,
        baseBoosterProbability: 20,
        spenderRatio: 20,
        whaleRatio: 10,
    },
    "High Churn": {
        // Players are churning quickly
        baseChurnRate: 30,
        basePlayProbability: 60,
        progressionSatisfactionWeight: 0.3,
        spendingSatisfactionWeight: 0.7,
    },
    "Generous Rewards": {
        // Game offers generous rewards
        dailyReward: 20,
        levelCompletionReward: 15,
        milestoneReward: 100,
        xpPerDailyReward: 20,
        xpPerLevelCompletion: 40,
        xpPerMilestone: 200,
        costPerPlay: 3,
        boosterCost: 5,
    },
    "Hard Progression": {
        // Progression is challenging
        costPerPlay: 10,
        boosterCost: 15,
        levelCompletionReward: 3,
        progressionSatisfactionWeight: 0.7,
        spendingSatisfactionWeight: 0.3,
        baseChurnRate: 15,
    }
};

// Function to load preset values into input fields
function loadPreset() {
    const presetName = document.getElementById('presetSelector').value;
    const preset = presets[presetName];

    if (!preset) {
        console.error(`Preset "${presetName}" not found.`);
        return;
    }

    // Update input fields with preset values
    document.getElementById('playerCount').value = preset.playerCount !== undefined ? preset.playerCount : 24;
    document.getElementById('simulationDays').value = preset.simulationDays !== undefined ? preset.simulationDays : 30;
    document.getElementById('baseChurnRate').value = preset.baseChurnRate !== undefined ? preset.baseChurnRate : 10;
    document.getElementById('learningRate').value = preset.learningRate !== undefined ? preset.learningRate : 0.01;
    document.getElementById('progressionSatisfactionWeight').value = preset.progressionSatisfactionWeight !== undefined ? preset.progressionSatisfactionWeight : 0.5;
    document.getElementById('spendingSatisfactionWeight').value = preset.spendingSatisfactionWeight !== undefined ? preset.spendingSatisfactionWeight : 0.5;
    document.getElementById('freePlayerRatio').value = preset.freePlayerRatio !== undefined ? preset.freePlayerRatio : 80;
    document.getElementById('spenderRatio').value = preset.spenderRatio !== undefined ? preset.spenderRatio : 15;
    document.getElementById('whaleRatio').value = preset.whaleRatio !== undefined ? preset.whaleRatio : 5;
    document.getElementById('dailyReward').value = preset.dailyReward !== undefined ? preset.dailyReward : 10;
    document.getElementById('levelCompletionReward').value = preset.levelCompletionReward !== undefined ? preset.levelCompletionReward : 5;
    document.getElementById('milestoneReward').value = preset.milestoneReward !== undefined ? preset.milestoneReward : 50;
    document.getElementById('milestoneIntervalType').value = preset.milestoneIntervalType !== undefined ? preset.milestoneIntervalType : "linear";
    document.getElementById('xpPerDailyReward').value = preset.xpPerDailyReward !== undefined ? preset.xpPerDailyReward : 10;
    document.getElementById('xpPerLevelCompletion').value = preset.xpPerLevelCompletion !== undefined ? preset.xpPerLevelCompletion : 20;
    document.getElementById('xpPerMilestone').value = preset.xpPerMilestone !== undefined ? preset.xpPerMilestone : 100;
    document.getElementById('baseIapProbability').value = preset.baseIapProbability !== undefined ? preset.baseIapProbability : 10;
    document.getElementById('revenuePerPurchase').value = preset.revenuePerPurchase !== undefined ? preset.revenuePerPurchase : 4.99;
    document.getElementById('creditsPerPurchase').value = preset.creditsPerPurchase !== undefined ? preset.creditsPerPurchase : 500;
    document.getElementById('boosterCost').value = preset.boosterCost !== undefined ? preset.boosterCost : 10;
    document.getElementById('baseBoosterProbability').value = preset.baseBoosterProbability !== undefined ? preset.baseBoosterProbability : 10;
    document.getElementById('basePlayProbability').value = preset.basePlayProbability !== undefined ? preset.basePlayProbability : 70;
    document.getElementById('costPerPlay').value = preset.costPerPlay !== undefined ? preset.costPerPlay : 5;

    // Optionally, reset error messages
    document.getElementById('ratioErrorMessage').textContent = '';
    document.getElementById('satisfactionWeightErrorMessage').textContent = '';
}

// Ensure the loadPreset function is accessible globally
window.loadPreset = loadPreset;

// Rest of the simulation.js code remains unchanged
// ...


// The rest of the simulation.js code

const playerNames = ["Alex", "Blake", "Casey", "Dakota", "Emerson", "Finley", "Gray", "Harper", "Jordan", "Kendall", "Riley", "Taylor", "Cameron", "Drew", "Morgan", "Quinn", "Skyler", "Parker"];
const playerColors = ["#ff9999", "#99ccff", "#66ff66", "#ffcc66", "#cc99ff", "#ff6666", "#99ff99", "#ff99cc"];
let players = [];
let maxCredits = 0, maxXP = 0, maxLevels = 0, maxBoosters = 0;

class Player {
    constructor(name, color, playProbability, iapProbability, boosterProbability, type, baseChurnRate, learningRate, progressionSatisfactionWeight, spendingSatisfactionWeight) {
        this.name = name;
        this.color = color;
        this.credits = 0;
        this.xp = 0;
        this.levelsCompleted = 0;
        this.boostersUsed = 0;
        this.purchases = 0;
        this.milestonesReached = 0;
        this.creditsSpent = 0;
        this.dollarsSpent = 0;
        this.playProbability = playProbability;
        this.iapProbability = iapProbability;
        this.boosterProbability = boosterProbability;
        this.type = type;
        this.churned = false;
        this.daysChurned = 0;
        this.baseChurnRate = baseChurnRate;
        this.learningRate = learningRate;
        this.progressionSatisfactionWeight = progressionSatisfactionWeight;
        this.spendingSatisfactionWeight = spendingSatisfactionWeight;
    }

    earnDailyReward(dailyReward, xpPerDailyReward) {
        this.credits += dailyReward;
        this.xp += xpPerDailyReward;
    }

    completeLevel(costPerPlay, levelCompletionReward, xpPerLevelCompletion) {
        if (this.credits >= costPerPlay) {
            this.credits -= costPerPlay;
            this.creditsSpent += costPerPlay;
            this.levelsCompleted++;
            this.credits += levelCompletionReward;
            this.xp += xpPerLevelCompletion;
            return true;
        } else {
            return false;
        }
    }

    checkMilestone(milestones, milestoneReward, xpPerMilestone) {
        if (milestones.includes(this.levelsCompleted)) {
            this.credits += milestoneReward;
            this.xp += xpPerMilestone;
            this.milestonesReached++;
        }
    }

    buyBooster(boosterCost) {
        if (this.credits >= boosterCost) {
            const wantsBooster = Math.random() < this.boosterProbability;
            if (wantsBooster) {
                this.credits -= boosterCost;
                this.creditsSpent += boosterCost;
                this.boostersUsed++;
                this.adjustProbabilities('booster', true);
            } else {
                this.adjustProbabilities('booster', false);
            }
        }
    }

    makePurchase(creditsPerPurchase, revenuePerPurchase) {
        if (Math.random() < this.iapProbability) {
            this.purchases++;
            this.credits += creditsPerPurchase;
            this.dollarsSpent += revenuePerPurchase;
            this.adjustProbabilities('purchase', true);
            return revenuePerPurchase;
        } else {
            this.adjustProbabilities('purchase', false);
            return 0;
        }
    }

    decideToPlay() {
        return !this.churned && Math.random() < this.playProbability;
    }

    adjustProbabilities(action, success) {
        const lr = this.learningRate;
        if (action === 'play') {
            this.playProbability = this.updateProbability(this.playProbability, success, lr);
        } else if (action === 'purchase') {
            this.iapProbability = this.updateProbability(this.iapProbability, success, lr);
        } else if (action === 'booster') {
            this.boosterProbability = this.updateProbability(this.boosterProbability, success, lr);
        }
    }

    updateProbability(currentProb, success, learningRate) {
        if (success) {
            return Math.min(currentProb + learningRate, 1);
        } else {
            return Math.max(currentProb - learningRate, 0);
        }
    }

    calculateSatisfaction() {
        const progressFactor = Math.min(this.levelsCompleted / 100, 1);
        const spendingFactor = this.dollarsSpent > 0 ? 1 : 0;
        const totalWeight = this.progressionSatisfactionWeight + this.spendingSatisfactionWeight;
        const normalizedProgressionWeight = this.progressionSatisfactionWeight / totalWeight;
        const normalizedSpendingWeight = this.spendingSatisfactionWeight / totalWeight;
        const satisfaction = (progressFactor * normalizedProgressionWeight) + (spendingFactor * normalizedSpendingWeight);
        return Math.min(satisfaction, 1);
    }

    maybeChurn() {
        const satisfaction = this.calculateSatisfaction();
        const churnChance = (1 - satisfaction) * (this.baseChurnRate / 100);
        if (Math.random() < churnChance) {
            this.churned = true;
            this.daysChurned = 0;
        }
    }

    maybeReturn() {
        if (this.churned) {
            this.daysChurned++;
            const returnChance = 0.05 * this.daysChurned;
            if (Math.random() < returnChance) {
                this.churned = false;
                this.daysChurned = 0;
            }
        }
    }
}

function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getMilestoneLevels(type) {
    const milestones = [];
    if (type === 'fibonacci') {
        let a = 1, b = 1;
        while (b * 10 <= 1000) {
            milestones.push(b * 10);
            [a, b] = [b, a + b];
        }
    } else {
        let currentLevel = 10;
        while (currentLevel <= 1000) {
            milestones.push(currentLevel);
            currentLevel += 10;
        }
    }
    return milestones;
}

function drawPlayer(ctx, player, x, y, maxCredits, maxXP, maxLevels, maxBoosters) {
    const size = 19;
    const barWidth = 60;
    const barHeight = 5;
    const spacing = 2;

    // Dim the player if churned
    ctx.globalAlpha = player.churned ? 0.5 : 1;

    // Draw player circle
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();

    // Draw player name
    ctx.fillStyle = "black";
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    ctx.fillText(player.name, x, y);

    // Draw progress bars
    drawProgressBar(ctx, x + size + spacing, y - size, barWidth, barHeight, player.credits, maxCredits, "yellow");
    drawProgressBar(ctx, x + size + spacing, y - size + spacing + barHeight, barWidth, barHeight, player.xp, maxXP, "purple");
    drawProgressBar(ctx, x + size + spacing, y - size + 2 * (spacing + barHeight), barWidth, barHeight, player.levelsCompleted, maxLevels, "green");
    drawProgressBar(ctx, x + size + spacing, y - size + 3 * (spacing + barHeight), barWidth, barHeight, player.boostersUsed, maxBoosters, "blue");

    // Draw player stats panel
    ctx.fillStyle = "white";
    ctx.fillRect(x - size, y + size+10, barWidth + 40, 150);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x - size, y + size +10, barWidth + 40, 150);

    ctx.fillStyle = "black";
    ctx.font = "10px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`Type: ${player.type}`, x - size + 5, y + size + 25);
    ctx.fillText(`Credits: ${player.credits}`, x - size + 5, y + size + 35);
    ctx.fillText(`XP: ${player.xp}`, x - size + 5, y + size + 45);
    ctx.fillText(`Levels: ${player.levelsCompleted}`, x - size + 5, y + size + 55);
    ctx.fillText(`Boosters: ${player.boostersUsed}`, x - size + 5, y + size + 65);
    ctx.fillText(`Purchases: ${player.purchases}`, x - size + 5, y + size + 75);
    ctx.fillText(`Milestones: ${player.milestonesReached}`, x - size + 5, y + size + 85);
    ctx.fillText(`Dollars: $${player.dollarsSpent.toFixed(2)}`, x - size + 5, y + size + 95);
    ctx.fillText(`Play Prob: ${(player.playProbability * 100).toFixed(1)}%`, x - size + 5, y + size + 105);
    ctx.fillText(`IAP Prob: ${(player.iapProbability * 100).toFixed(1)}%`, x - size + 5, y + size + 115);
    ctx.fillText(`Booster Prob: ${(player.boosterProbability * 100).toFixed(1)}%`, x - size + 5, y + size + 125);
    ctx.fillText(`Churned: ${player.churned ? 'Yes' : 'No'}`, x - size + 5, y + size + 135);
    ctx.fillText(`Satisfaction: ${(player.calculateSatisfaction() * 100).toFixed(1)}%`, x - size + 5, y + size + 145);

    // Reset alpha
    ctx.globalAlpha = 1;
}

function drawProgressBar(ctx, x, y, width, height, value, maxValue, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, (value / maxValue) * width, height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, width, height);
}

function adjustCanvasSize(playerCount) {
    const canvas = document.getElementById("simulationCanvas");
    const playersPerRow = 4;
    const rows = Math.ceil(playerCount / playersPerRow);
    canvas.width = playersPerRow * 250; // Width per player
    canvas.height = rows * 370; // Height per row
}

async function runSimulation() {
    console.log("Simulation started");

    // Input validation
    const playerCount = parseInt(document.getElementById('playerCount').value);
    if (isNaN(playerCount) || playerCount <= 0) {
        alert('Player Count must be a positive number.');
        return;
    }

    const simulationDays = parseInt(document.getElementById('simulationDays').value);
    const baseChurnRateInput = parseFloat(document.getElementById('baseChurnRate').value);
    const baseChurnRate = isNaN(baseChurnRateInput) ? 0.1 : baseChurnRateInput;

    // Learning Rate
    const learningRateInput = parseFloat(document.getElementById('learningRate').value);
    const learningRate = isNaN(learningRateInput) ? 0.01 : learningRateInput;

    // Satisfaction Weights
    const progressionSatisfactionWeightInput = parseFloat(document.getElementById('progressionSatisfactionWeight').value);
    const spendingSatisfactionWeightInput = parseFloat(document.getElementById('spendingSatisfactionWeight').value);

    const totalSatisfactionWeight = progressionSatisfactionWeightInput + spendingSatisfactionWeightInput;

    // Validate satisfaction weights
    if (totalSatisfactionWeight <= 0) {
        document.getElementById('satisfactionWeightErrorMessage').textContent = 'Satisfaction weights must sum to more than 0.';
        return;
    } else {
        document.getElementById('satisfactionWeightErrorMessage').textContent = '';
    }

    // Player Type Ratios
    const freePlayerRatioInput = parseFloat(document.getElementById('freePlayerRatio').value);
    const spenderRatioInput = parseFloat(document.getElementById('spenderRatio').value);
    const whaleRatioInput = parseFloat(document.getElementById('whaleRatio').value);

    const totalRatio = freePlayerRatioInput + spenderRatioInput + whaleRatioInput;

    // Validate player type ratios
    if (totalRatio !== 100) {
        document.getElementById('ratioErrorMessage').textContent = 'Player type ratios must sum up to 100%.';
        return;
    } else {
        document.getElementById('ratioErrorMessage').textContent = '';
    }

    const freePlayerRatio = freePlayerRatioInput / 100;
    const spenderRatio = spenderRatioInput / 100;
    const whaleRatio = whaleRatioInput / 100;

    // Retrieve other simulation parameters
    const baseIapProbability = parseFloat(document.getElementById('baseIapProbability').value) / 100;
    const revenuePerPurchase = parseFloat(document.getElementById('revenuePerPurchase').value);
    const creditsPerPurchase = parseInt(document.getElementById('creditsPerPurchase').value);
    const dailyReward = parseInt(document.getElementById('dailyReward').value);
    const levelCompletionReward = parseInt(document.getElementById('levelCompletionReward').value);
    const milestoneReward = parseInt(document.getElementById('milestoneReward').value);
    const milestoneIntervalType = document.getElementById('milestoneIntervalType').value;
    const xpPerDailyReward = parseInt(document.getElementById('xpPerDailyReward').value);
    const xpPerLevelCompletion = parseInt(document.getElementById('xpPerLevelCompletion').value);
    const xpPerMilestone = parseInt(document.getElementById('xpPerMilestone').value);
    const boosterCost = parseInt(document.getElementById('boosterCost').value);
    const baseBoosterProbability = parseFloat(document.getElementById('baseBoosterProbability').value) / 100;
    const costPerPlay = parseInt(document.getElementById('costPerPlay').value);
    const basePlayProbability = parseFloat(document.getElementById('basePlayProbability').value) / 100;

    const milestones = getMilestoneLevels(milestoneIntervalType);

    // Player types configuration
    const playerTypes = {
        "Free Player": {
            playProbabilityRange: [basePlayProbability * 0.8, basePlayProbability * 1.0],
            iapProbabilityRange: [0, baseIapProbability * 0.2],
            boosterProbabilityRange: [baseBoosterProbability * 0.5, baseBoosterProbability * 1.0],
            proportion: freePlayerRatio
        },
        "Spender": {
            playProbabilityRange: [basePlayProbability * 0.9, basePlayProbability * 1.1],
            iapProbabilityRange: [baseIapProbability * 0.5, baseIapProbability * 1.0],
            boosterProbabilityRange: [baseBoosterProbability * 1.0, baseBoosterProbability * 1.5],
            proportion: spenderRatio
        },
        "High Spender": {
            playProbabilityRange: [basePlayProbability * 1.0, 1.0],
            iapProbabilityRange: [baseIapProbability * 1.5, 1.0],
            boosterProbabilityRange: [baseBoosterProbability * 1.5, 1.0],
            proportion: whaleRatio
        },
    };

    players = [];

    // Generate players based on user-defined proportions
    for (let typeName in playerTypes) {
        const typeConfig = playerTypes[typeName];
        const numPlayers = Math.floor(typeConfig.proportion * playerCount);
        for (let i = 0; i < numPlayers; i++) {
            const iapProbability = getRandomValue(...typeConfig.iapProbabilityRange);
            const boosterProbability = getRandomValue(...typeConfig.boosterProbabilityRange);
            const playProbability = getRandomValue(...typeConfig.playProbabilityRange);
            players.push(new Player(
                getRandomItem(playerNames),
                getRandomItem(playerColors),
                playProbability,
                iapProbability,
                boosterProbability,
                typeName,
                baseChurnRate,
                learningRate,
                progressionSatisfactionWeightInput,
                spendingSatisfactionWeightInput
            ));
        }
    }

    // Fill any remaining players as Free Players
    while (players.length < playerCount) {
        const typeConfig = playerTypes["Free Player"];
        const iapProbability = getRandomValue(...typeConfig.iapProbabilityRange);
        const boosterProbability = getRandomValue(...typeConfig.boosterProbabilityRange);
        const playProbability = getRandomValue(...typeConfig.playProbabilityRange);
        players.push(new Player(
            getRandomItem(playerNames),
            getRandomItem(playerColors),
            playProbability,
            iapProbability,
            boosterProbability,
            "Free Player",
            baseChurnRate,
            learningRate,
            progressionSatisfactionWeightInput,
            spendingSatisfactionWeightInput
        ));
    }

    adjustCanvasSize(players.length);

    const canvas = document.getElementById("simulationCanvas");
    const ctx = canvas.getContext("2d");

    let totalRevenue = 0;

    async function simulateDay(day) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        players.forEach(player => {
            player.maybeReturn();

            if (!player.churned) {
                player.earnDailyReward(dailyReward, xpPerDailyReward);

                if (player.decideToPlay()) {
                    let playedLevel = player.completeLevel(costPerPlay, levelCompletionReward, xpPerLevelCompletion);
                    if (playedLevel) {
                        player.checkMilestone(milestones, milestoneReward, xpPerMilestone);
                        player.adjustProbabilities('play', true);
                    } else {
                        player.adjustProbabilities('play', false);

                        const revenue = player.makePurchase(creditsPerPurchase, revenuePerPurchase);
                        totalRevenue += revenue;
                        if (revenue > 0) {
                            playedLevel = player.completeLevel(costPerPlay, levelCompletionReward, xpPerLevelCompletion);
                            if (playedLevel) {
                                player.checkMilestone(milestones, milestoneReward, xpPerMilestone);
                            }
                        }
                    }
                }

                player.buyBooster(boosterCost);

                // Player might churn based on satisfaction
                player.maybeChurn();
            }
        });

        // Find max values for scaling
        maxCredits = Math.max(...players.map(p => p.credits));
        maxXP = Math.max(...players.map(p => p.xp));
        maxLevels = Math.max(...players.map(p => p.levelsCompleted));
        maxBoosters = Math.max(...players.map(p => p.boostersUsed));

        players.forEach((player, index) => {
            const playersPerRow = 6;
            const x = (index % playersPerRow) * 150 + 125;
            const y = Math.floor(index / playersPerRow) * 250 + 100;
            drawPlayer(ctx, player, x, y, maxCredits, maxXP, maxLevels, maxBoosters);
        });

        // Update dashboard and charts
        let totalPurchases = 0;
        let totalCreditsAwarded = 0;
        let totalCreditsSpent = 0;
        let totalBoostersUsed = 0;
        let totalLevelsCompleted = 0;
        let totalMilestonesReached = 0;
        let totalXP = 0;
        let totalActivePlayers = 0;

        players.forEach(player => {
            totalCreditsAwarded += player.credits;
            totalCreditsSpent += player.creditsSpent;
            totalBoostersUsed += player.boostersUsed;
            totalLevelsCompleted += player.levelsCompleted;
            totalMilestonesReached += player.milestonesReached;
            totalXP += player.xp;
            totalPurchases += player.purchases;
            if (!player.churned && player.decideToPlay()) {
                totalActivePlayers++;
            }
        });

        updateDashboard(day, totalRevenue, totalPurchases, totalCreditsAwarded, totalCreditsSpent, totalBoostersUsed, totalLevelsCompleted, totalMilestonesReached, totalXP);
        updateCharts(day, totalCreditsAwarded, totalActivePlayers, totalCreditsSpent);

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    for (let day = 1; day <= simulationDays; day++) {
        await simulateDay(day);
    }

    console.log("Simulation ended");
}

// Chart.js setup
const creditsAwardedChartCtx = document.getElementById('creditsAwardedChart').getContext('2d');
const activePlayersChartCtx = document.getElementById('activePlayersChart').getContext('2d');
const creditsSpentChartCtx = document.getElementById('creditsSpentChart').getContext('2d');

const creditsAwardedChart = new Chart(creditsAwardedChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Credits Awarded',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: 'Day' } },
            y: { title: { display: true, text: 'Credits Awarded' } }
        }
    }
});

const activePlayersChart = new Chart(activePlayersChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Active Players',
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: 'Day' } },
            y: { title: { display: true, text: 'Active Players' } }
        }
    }
});

const creditsSpentChart = new Chart(creditsSpentChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Credits Spent',
            data: [],
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: 'Day' } },
            y: { title: { display: true, text: 'Credits Spent' } }
        }
    }
});

// Update charts with new data
function updateCharts(day, totalCreditsAwarded, totalActivePlayers, totalCreditsSpent) {
    creditsAwardedChart.data.labels.push(day);
    creditsAwardedChart.data.datasets[0].data.push(totalCreditsAwarded);
    creditsAwardedChart.update();

    activePlayersChart.data.labels.push(day);
    activePlayersChart.data.datasets[0].data.push(totalActivePlayers);
    activePlayersChart.update();

    creditsSpentChart.data.labels.push(day);
    creditsSpentChart.data.datasets[0].data.push(totalCreditsSpent);
    creditsSpentChart.update();
}

// Update dashboard with new data
function updateDashboard(day, totalRevenue, totalPurchases, totalCreditsAwarded, totalCreditsSpent, totalBoostersUsed, totalLevelsCompleted, totalMilestonesReached, totalXP) {
    document.getElementById('currentDay').innerText = `Day: ${day}`;
    document.getElementById('totalRevenue').innerText = `$${totalRevenue.toFixed(2)}`;
    document.getElementById('totalPurchases').innerText = `${totalPurchases}`;
    document.getElementById('totalCreditsAwarded').innerText = `${totalCreditsAwarded}`;
    document.getElementById('totalCreditsSpent').innerText = `${totalCreditsSpent}`;
    document.getElementById('totalBoosters').innerText = `${totalBoostersUsed}`;
    document.getElementById('totalLevels').innerText = `${totalLevelsCompleted}`;
    document.getElementById('totalMilestones').innerText = `${totalMilestonesReached}`;
    document.getElementById('totalXP').innerText = `${totalXP}`;
}

// Adjust the canvas size
function setupCanvas() {
    const canvas = document.getElementById("simulationCanvas");
    window.addEventListener('resize', () => adjustCanvasSize(players.length));
}

setupCanvas();
