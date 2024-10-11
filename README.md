# F2P Game Mechanics Simulator

A web-based simulator to model and analyse player behaviour in free-to-play (F2P) game environments. This tool allows you to explore how different game mechanics, monetisation strategies, and player dynamics impact overall game performance, player retention, and revenue generation.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Simulation](#running-the-simulation)
  - [Adjusting Parameters](#adjusting-parameters)
  - [Presets](#presets)
- [Simulation Outputs](#simulation-outputs)
  - [Dashboard Metrics](#dashboard-metrics)
  - [Charts](#charts)
  - [Player Details](#player-details)
- [Customization](#customization)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

- **Adjustable Parameters:** Modify a wide range of parameters to simulate different game scenarios.
- **Player Types:** Categorise players into Free Players, Spenders, and High Spenders (Whales).
- **Adaptive Behaviour:** Players adjust their behaviour over time based on experiences and satisfaction levels.
- **Visualisations:** Real-time dashboard, charts, and player representations.
- **Presets:** Quickly load predefined scenarios to explore common game dynamics.

---

## Getting Started

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).
- Internet connection (required for loading external libraries via CDN).

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/redeye/F2P-Sim.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd f2psim
   ```

3. **Project Structure:**

   - `index.html`: The main HTML file.
   - `styles.css`: Stylesheet for the application.
   - `simulation.js`: JavaScript code for the simulation.
   - `README.md`: This file.

---

## Usage

### Running the Simulation

1. **Open `index.html`:**

   - Open the `index.html` file in your web browser.

2. **Select a Preset or Adjust Parameters:**

   - Use the **Preset** dropdown menu to select a predefined scenario.
   - Adjust the **Player Count** and **Simulation Days** as needed.

3. **Run the Simulation:**

   - Click the **"Run Simulation"** button to start.

### Adjusting Parameters

- **Simulation Settings:**

  - **Player Count:** Number of players in the simulation.
  - **Simulation Days:** Duration of the simulation in days.

- **Player Type Ratios (%):**

  - **Free Players:** Percentage of players who rarely make purchases.
  - **Spenders:** Percentage of players who occasionally make purchases.
  - **High Spenders (Whales):** Percentage of players who frequently make purchases.

- **Churn Settings:**

  - **Player Churn Rate (%):** Base probability that a dissatisfied player will leave the game.
  - **Progression Satisfaction Weight:** Importance of game progression in player satisfaction.
  - **Spending Satisfaction Weight:** Importance of spending in player satisfaction.

- **Learning Rate:**

  - Rate at which players adapt their behaviour based on experiences.

- **Rewards:**

  - **Daily Reward (Credits):** Credits awarded daily to players.
  - **Level Completion Reward (Credits):** Credits awarded upon level completion.
  - **Milestone Reward (Credits):** Credits awarded when reaching milestones.
  - **Milestone Interval Type:** Frequency of milestones (`linear` or `fibonacci`).

- **XP Rewards:**

  - **XP per Daily Reward:** Experience points awarded daily.
  - **XP per Level Completion:** Experience points awarded upon level completion.
  - **XP per Milestone:** Experience points awarded when reaching milestones.

- **In-App Purchases:**

  - **In-App Purchase Probability when Out of Credits (%):** Chance of making a purchase when unable to play.
  - **Average Revenue per Purchase ($):** Revenue generated per purchase.
  - **Credits per Purchase:** Credits received per purchase.

- **Boosters:**

  - **Booster Cost (Credits):** Cost of purchasing a booster.
  - **Booster Purchase Probability (%):** Chance of purchasing a booster.

- **Gameplay:**

  - **Daily Play Probability (%):** Base chance of a player deciding to play each day.
  - **Cost per Play (Credits):** Credits required to play a level.

### Presets

The simulator includes several presets representing common game scenarios:

1. **Default (Balanced Game):** A well-balanced game with moderate engagement, monetisation, and churn rates.

2. **High Engagement:**

   - **Description:** Players are highly engaged, play frequently, and are less likely to churn.
   - **Key Adjustments:** Increased play probability, decreased churn rate, increased learning rate.

3. **Low Monetization:**

   - **Description:** Players are engaged but less willing to spend money.
   - **Key Adjustments:** Decreased in-app purchase probability and revenue per purchase.

4. **High Monetization:**

   - **Description:** Players are more willing to spend money, resulting in higher revenue.
   - **Key Adjustments:** Increased in-app purchase probability and revenue per purchase.

5. **High Churn:**

   - **Description:** Players are disengaging quickly, leading to high churn rates.
   - **Key Adjustments:** Increased churn rate, decreased play probability.

6. **Generous Rewards:**

   - **Description:** The game offers generous rewards, which may affect player satisfaction and spending behaviour.
   - **Key Adjustments:** Increased rewards and XP, decreased costs.

7. **Hard Progression:**

   - **Description:** Progression is more challenging, potentially increasing spending but risking higher churn.
   - **Key Adjustments:** Increased costs, decreased rewards, adjusted satisfaction weights.

---

## Simulation Outputs

### Dashboard Metrics

- **Day:** Current day in the simulation.
- **Revenue:** Total revenue generated from in-app purchases.
- **Purchases:** Total number of in-app purchases made.
- **Credits Awarded:** Total credits awarded to players.
- **Credits Spent:** Total credits spent by players.
- **Boosters Used:** Total number of boosters purchased.
- **Levels Completed:** Total levels completed by players.
- **Milestones Reached:** Total milestones achieved.
- **XP Earned:** Total experience points accumulated.

### Charts

- **Credits Awarded Chart:** Total credits awarded over time.
- **Active Players Chart:** Number of active players each day.
- **Credits Spent Chart:** Total credits spent over time.

### Player Details

- **Individual Stats:** Each player displays:
  - **Type:** Free Player, Spender, or High Spender.
  - **Credits:** Current credits.
  - **XP:** Experience points accumulated.
  - **Levels Completed:** Number of levels completed.
  - **Boosters Used:** Number of boosters purchased.
  - **Purchases:** Number of in-app purchases made.
  - **Milestones Reached:** Number of milestones achieved.
  - **Dollars Spent:** Total amount spent on in-app purchases.
  - **Probabilities:** Current play, IAP, and booster probabilities.
  - **Churned:** Whether the player has left the game.
  - **Satisfaction:** Current satisfaction level.

---

## Customisation

You can further customize the simulator by:

- **Modifying Presets:** Add or adjust presets in the `simulation.js` file under the `presets` object.
- **Adjusting Player Types:** Change player type ratios and behavior probabilities.
- **Tweaking Game Mechanics:** Experiment with different costs, rewards, and progression mechanics.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- **Chart.js:** For providing an excellent charting library.
- **OpenAI's ChatGPT:** Assisted in generating and refining code and documentation.
- **Contributors:** Thanks to everyone who has contributed to improving this simulator.

---

**Note:** This simulator is a simplified model and may not capture all real-world complexities. It is intended for educational and exploratory purposes. Users should consider additional factors and data when applying insights to actual game development.

---