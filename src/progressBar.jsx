import React, { useEffect, useState } from "react";
import "./styles.css";

function ProgressBar({ milestones, currentProgress }) {
	const [progress, setProgress] = useState();

	useEffect(() => {
		calculateProgress();
		milestones.forEach((milestone, i) => {
			milestone.position = ((i + 1) / (milestones.length + 1)) * 100;
		});
		if (milestones.length === 0) {
			setProgress(0);
		}
	}, [milestones, currentProgress]);

	const calculateProgress = () => {
		let prevMilestone = 0;
		const numMilestones = milestones.length;

		for (let i = 0; i < numMilestones; i++) {
			const milestone = milestones[i];
			const nextMilestone = i < numMilestones - 1 ? milestones[i + 1] : null;

			if (currentProgress === "" || currentProgress === undefined) {
				setProgress(0);
				return;
			}

			const lastMilestone = milestones[milestones.length - 1].value;

			if (currentProgress > lastMilestone) {
				setProgress(100);
				return;
			}

			if (currentProgress <= milestone.value) {
				const range = milestone.value - prevMilestone;

				const position = nextMilestone
					? ((currentProgress - milestone.value) / range) *
							(nextMilestone.position - milestone.position) +
					  milestone.position
					: ((currentProgress - milestone.value) / range) *
							(100 - milestone.position) +
					  milestone.position;

				setProgress(position);

				break;
			}
			prevMilestone = milestone.value;
		}
	};

	const milestonesAvailable = milestones.length !== 0;
	return (
		<div className="progress-bar-container">
			<p>
				Milestones:{" "}
				{milestonesAvailable &&
					milestones.map((milestone) => milestone.value).join(", ")}
			</p>
			<div className="divider"></div>
			<div className="progress-bar">
				<div
					className="progress-bar-fill"
					style={{ width: `${progress}%`, backgroundColor: "green" }}
				></div>
				{milestones.map((milestone, index) => {
					const milestoneCompleted = currentProgress >= milestone.value;
					return (
						<div
							key={index}
							className="progress-bar-milestones"
							style={{
								left: `calc(${
									((index + 1) / (milestones.length + 1)) * 100
								}% - 20px)`,
							}}
						>
							<div
								className={`progress-bar-milestone ${
									milestoneCompleted ? "completed" : ""
								}`}
								style={{
									backgroundColor: milestoneCompleted ? "green" : "white",
									color: milestoneCompleted ? "white" : "green",
								}}
							>
								<span>{milestoneCompleted ? "✓" : ""}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ProgressBar;
