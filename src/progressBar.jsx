import { useEffect, useState } from "react";
import {
	Box,
	Progress,
	Text,
	Icon,
	Divider,
	Flex,
	Input,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

function ProgressBar({ milestones }) {
	const [currentProgress, setCurrentProgress] = useState(0);
	const [progress, setProgress] = useState();

	useEffect(() => {
		calculateProgress();
	}, [milestones, currentProgress]);

	const handleProgressChange = (event) => {
		const newValue = event.target.value;
		setCurrentProgress(newValue);
		if (newValue === "") {
			setProgress(0);
		} else {
			calculateProgress();
		}
	};

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

	const milestonesAvailable = milestones.length !== 0;
	return (
		<Box textAlign="center" position="relative">
			<Text>
				Milestones:{" "}
				{milestonesAvailable &&
					milestones.map((milestone) => milestone.value).join(", ")}
			</Text>
			<Divider my={10} />
			<Progress value={progress} colorScheme="green" />
			{milestones.map((milestone, index) => {
				const milestoneCompleted = currentProgress >= milestone.value;
				return (
					<Box
						key={index}
						position="absolute"
						left={`calc(${
							((index + 1) / (milestones.length + 1)) * 100
						}% - 12px)`}
						top="calc(52%)"
						transform="translateY(-50%)"
						zIndex="1"
						textAlign="center"
					>
						<Box
							borderRadius="full"
							borderWidth="1px"
							borderColor="green.500"
							bg={milestoneCompleted ? "green.500" : "white"}
							color={milestoneCompleted ? "white" : "green.500"}
							h="2rem"
							w="2rem"
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<Icon
								as={CheckIcon}
								color={milestoneCompleted ? "white" : "green.500"}
							/>
						</Box>
					</Box>
				);
			})}
			<Divider my={5} />
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
		</Box>
	);
}

export default ProgressBar;
