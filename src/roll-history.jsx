import { useState } from "preact/hooks";
import styles from "./style.module.css";
import HistoryItem from "./history-item";
import { FiTrash2 } from "react-icons/fi";

const RollHistory = ({ history, clearHistory, onRestore }) => {
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
				<>
					<div className={styles.rollHistoryHeader}>
						<h2>Roll History</h2>
						<button className={styles.clearButton} onClick={clearHistory}>
							<FiTrash2 /> Clear History
						</button>
					</div>
					<ul className={styles.historyList}>
						{history.map((roll, index) => (
							<HistoryItem key={index} roll={roll} onRestore={onRestore} />
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default RollHistory;
