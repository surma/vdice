import styles from "./style.module.css";
import { FiRefreshCw } from "react-icons/fi";

const HistoryItem = ({ roll, onRestore }) => (
	<li className={styles.historyItem}>
		<div className={styles.historyItemContent}>
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
		</div>
		<button
			className={`${styles.button} ${styles.restoreButton}`}
			onClick={() => onRestore(roll)}
		>
			<FiRefreshCw /> Restore
		</button>
	</li>
);

export default HistoryItem;
