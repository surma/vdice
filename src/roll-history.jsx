import { useState } from "preact/hooks";
import styles from "./style.module.css";
import HistoryItem from "./history-item";

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
						<HistoryItem key={index} roll={roll} />
					))}
				</ul>
			)}
		</div>
	);
};

export default RollHistory;
