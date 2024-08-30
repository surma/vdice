import styles from "./style.module.css";

const HistoryItem = ({ roll }) => (
	<li className={styles.historyItem}>
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
);

export default HistoryItem;
