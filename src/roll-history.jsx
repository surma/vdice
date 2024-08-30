import { useState } from "preact/hooks";
import styles from "./style.module.css";

const RollHistory = ({ history }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className={styles.historyContainer}>
			<button
				className={styles.expandButton}
				onClick={() => setIsExpanded(!isExpanded)}
			>
				{isExpanded ? "Hide History" : "Show History"}
			</button>
			{isExpanded && (
				<ul className={styles.historyList}>
					{history.map((roll, index) => (
						<li key={index} className={styles.historyItem}>
							<span className={styles.timestamp}>
								{new Date(roll.timestamp).toLocaleString()}
							</span>
							<span className={styles.rollResults}>
								{roll.results.map((result, i) => (
									<span key={i} className={styles.dieResult}>
										D{result.sides}: {result.result}
									</span>
								))}
							</span>
							<span className={styles.rollTotal}>Total: {roll.total}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default RollHistory;
