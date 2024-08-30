import { useState, useEffect } from "preact/hooks";
import styles from "./style.module.css";

const DiceAnimation = ({ isRolling, onAnimationComplete }) => {
	const [frame, setFrame] = useState(0);
	const frames = 10; // Number of animation frames

	useEffect(() => {
		if (isRolling) {
			let currentFrame = 0;
			const interval = setInterval(() => {
				currentFrame++;
				setFrame(currentFrame);
				if (currentFrame >= frames) {
					clearInterval(interval);
					onAnimationComplete();
				}
			}, 100); // 100ms per frame

			return () => clearInterval(interval);
		}
	}, [isRolling, onAnimationComplete]);

	if (!isRolling) return null;

	return (
		<div className={styles.diceAnimation}>
			{/* Create a 5x5 grid of pixels */}
			{Array.from({ length: 25 }).map((_, i) => (
				<div
					key={i}
					className={styles.pixel}
					style={{
						backgroundColor: Math.random() > 0.5 ? "#000" : "#fff",
					}}
				/>
			))}
		</div>
	);
};

export default DiceAnimation;
