import { Component, h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { FiTrash2 } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { get, set } from "idb-keyval";
import styles from "./style.module.css";
import DiceAnimation from "./dice-animation";

const DiceRoller = () => {
	const [diceResults, setDiceResults] = useState([]);
	const [diceSet, setDiceSet] = useState([{ sides: 6, count: 1 }]);
	const [isRolling, setIsRolling] = useState(false);

	useEffect(() => {
		// Load saved dice configuration
		get("diceConfig").then((savedConfig) => {
			if (savedConfig) {
				setDiceSet(savedConfig);
			}
		});
	}, []);

	useEffect(() => {
		// Save dice configuration whenever it changes
		set("diceConfig", diceSet);
	}, [diceSet]);

	const addDice = () => {
		setDiceSet([...diceSet, { sides: 6, count: 1 }]);
	};

	const updateDice = (index, field, value) => {
		const newDiceSet = [...diceSet];
		newDiceSet[index][field] = parseInt(value, 10);
		setDiceSet(newDiceSet);
	};

	const removeDice = (index) => {
		setDiceSet(diceSet.filter((_, i) => i !== index));
	};

	const rollDice = () => {
		setIsRolling(true);
	};

	const handleAnimationComplete = () => {
		setIsRolling(false);
		const results = diceSet.flatMap(({ sides, count }) =>
			Array.from({ length: count }, () => ({
				sides,
				result: Math.floor(Math.random() * sides) + 1,
			})),
		);
		setDiceResults(results);
	};

	const handleSidesChange = (index, value) => {
		updateDice(index, "sides", value);
	};

	return (
		<div className={styles.container}>
			<h1>Dice Roller</h1>
			<div className={styles.diceContainer}>
				<span className={styles.columnHeader}>Dice Type</span>
				<span className={styles.columnHeader}>#Sides</span>
				<span className={styles.columnHeader}>#Dice</span>
				<span className={styles.columnHeader}></span>
				{diceSet.map((dice, index) => (
					<div key={index} className={styles.diceRow}>
						<select
							className={styles.select}
							value={dice.sides}
							onChange={(e) => handleSidesChange(index, e.target.value)}
						>
							<option value="">Custom</option>
							{[2, 3, 4, 6, 8, 10, 12, 20, 100].map((sides) => (
								<option key={sides} value={sides}>
									D{sides}
								</option>
							))}
						</select>
						<input
							className={styles.input}
							type="number"
							min="2"
							value={dice.sides}
							onChange={(e) => handleSidesChange(index, e.target.value)}
							placeholder="Sides"
						/>
						<input
							className={styles.input}
							type="number"
							min="1"
							value={dice.count}
							onChange={(e) => updateDice(index, "count", e.target.value)}
							placeholder="Count"
						/>
						<button
							className={`${styles.button} ${styles.removeButton}`}
							onClick={() => removeDice(index)}
						>
							<FiTrash2 />
						</button>
					</div>
				))}
			</div>
			<div className={styles.buttonContainer}>
				<button
					className={`${styles.button} ${styles.addButton}`}
					onClick={addDice}
				>
					<HiPlus /> Add Dice
				</button>
				<button
					className={`${styles.button} ${styles.rollButton}`}
					onClick={rollDice}
					disabled={isRolling}
				>
					Roll Dice
				</button>
			</div>
			<DiceAnimation
				isRolling={isRolling}
				onAnimationComplete={handleAnimationComplete}
			/>
			{diceResults.length > 0 && (
				<div className={styles.results}>
					<h2>Results:</h2>
					<ul className={styles.resultsList}>
						{diceResults.map((result, index) => (
							<li key={index} className={styles.resultItem}>
								D{result.sides}: {result.result}
							</li>
						))}
					</ul>
					<p className={styles.total}>
						Total: {diceResults.reduce((sum, result) => sum + result.result, 0)}
					</p>
				</div>
			)}
		</div>
	);
};

render(<DiceRoller />, document.body);