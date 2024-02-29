import React, { useEffect, useState } from "react";
import "./styles.css";
import ProgressBar from "./progressBar";

function App() {
	const [milestones, setMilestones] = useState([]);
	const [newMilestoneValue, setNewMilestoneValue] = useState("");
	const [currentProgress, setCurrentProgress] = useState(0);
	const [isDefault, setIsDefault] = useState(true);
	const defaultMilestones = [{ value: 500 }, { value: 1000 }, { value: 1250 }];

	const handleAddMilestone = () => {
		if (newMilestoneValue !== "") {
			const newMilestone = {
				value: parseInt(newMilestoneValue),
			};

			setMilestones([...milestones, newMilestone]);
			setNewMilestoneValue("");
		}
	};

	useEffect(() => {
		if (milestones.length === 0) {
			setCurrentProgress(0);
		}
	}, [milestones]);

	const handleProgressChange = (event) => {
		const newValue = event.target.value;
		if (newValue !== "") {
			setCurrentProgress(parseFloat(newValue));
		} else {
			setCurrentProgress("");
		}
	};

	const handleSliderChange = (value) => {
		const sliderValue = parseFloat(value);
		setCurrentProgress(isNaN(sliderValue) ? 0 : sliderValue);
	};

	const handleDefaultMilestones = () => {
		setIsDefault(!isDefault);
		setMilestones(isDefault ? defaultMilestones : []);
	};

	return (
		<div className="container">
			<div className="stack">
				<ProgressBar
					milestones={milestones}
					currentProgress={currentProgress}
				/>
				<div className="divider"></div>
				<div className="flex-container">
					<input
						type="range"
						min="0"
						max={
							milestones.length > 0
								? milestones[milestones.length - 1].value + 100
								: 100
						}
						onChange={(e) => handleSliderChange(e.target.value)}
						className="slider"
					/>
					<input
						type="number"
						placeholder="Enter current progress"
						value={currentProgress}
						onChange={handleProgressChange}
						className="input-number"
					/>
				</div>
				<div className="hstack">
					<input
						type="number"
						placeholder="Milestone value"
						value={newMilestoneValue}
						onChange={(e) => setNewMilestoneValue(e.target.value)}
						className="input-milestone"
					/>
					<button className="button-add-milestone" onClick={handleAddMilestone}>
						Add Milestone
					</button>
				</div>
				<button
					className="button-default-milestones"
					onClick={handleDefaultMilestones}
				>
					{isDefault ? "Use" : "Remove"} Default Milestones
				</button>
			</div>
		</div>
	);
}

export default App;
