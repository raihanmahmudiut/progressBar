import { useEffect, useRef, useState } from "react";
import {
	ChakraProvider,
	Input,
	Flex,
	Button,
	Stack,
	HStack,
	Container,
} from "@chakra-ui/react";
import ProgressBar from "./progressBar";
import "./App.css";

function App() {
	const [currentProgress, setCurrentProgress] = useState(0);
	const [progress, setProgress] = useState();
	const [milestones, setMilestones] = useState([]);
	const [newMilestoneValue, setNewMilestoneValue] = useState("");

	const handleProgressChange = (event) => {
		const newValue = event.target.value;
		setCurrentProgress(newValue);
		if (newValue === "") {
			setProgress(0);
		} else {
			calculateProgress();
		}
	};

	const handleAddMilestone = () => {
		if (newMilestoneValue != "") {
			const newMilestone = {
				value: parseInt(newMilestoneValue),
			};

			setMilestones([...milestones, newMilestone]);
			setNewMilestoneValue("");
		}
	};
	useEffect(() => {
		calculateProgress();
	}, [milestones, currentProgress]);

	const calculateProgress = () => {
		let prevMilestone = 0;
		const numMilestones = milestones.length;
		for (let i = 0; i < numMilestones; i++) {
			const milestone = milestones[i];
			const position = ((i + 1) / (numMilestones + 1)) * 100; // Calculate position dynamically
			milestone.position = position; // Set the position for the milestone
			const lastMilestone = milestones[milestones.length - 1].value;
			if (currentProgress > lastMilestone) {
				let percentage = 100;
				setProgress(percentage);
			}
			if (currentProgress <= milestone.value) {
				const range = milestone.value - prevMilestone;
				const progressInRange = currentProgress - prevMilestone;
				const percentage =
					position -
					((range - progressInRange) / range) * (100 / numMilestones);
				setProgress(percentage);
				break;
			}
			prevMilestone = milestone.value;
		}
	};

	return (
		<ChakraProvider>
			<Container>
				<Stack
					p={20}
					minH={"100vh"}
					alignContent="center"
					justifyContent="center"
				>
					<ProgressBar
						milestones={milestones}
						calculateProgress={calculateProgress}
						progress={progress}
						currentProgress={currentProgress}
					/>
					<Flex alignItems="center">
						<Input
							type="number"
							placeholder="Enter current progress"
							value={currentProgress}
							onChange={(e) => handleProgressChange(e)}
							mt={4}
							mr={2}
						/>
					</Flex>
					<HStack mt={4} alignItems="center" justifyContent={"space-between"}>
						<Input
							type="number"
							placeholder="Milestone value"
							value={newMilestoneValue}
							onChange={(e) => setNewMilestoneValue(e.target.value)}
							mr={2}
						/>
						<Button
							colorScheme="blue"
							onClick={handleAddMilestone}
							mr={2}
							w={"20rem"}
						>
							Add Milestone
						</Button>
					</HStack>
				</Stack>
			</Container>
		</ChakraProvider>
	);
}

export default App;
