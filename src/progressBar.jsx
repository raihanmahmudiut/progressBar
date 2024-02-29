import { CheckIcon } from "@chakra-ui/icons";
import {
	Box,
	Divider,
	Flex,
	Icon,
	Input,
	Progress,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCatchingPokemon } from "react-icons/md";

function ProgressBar({ milestones, currentProgress }) {
	const [progress, setProgress] = useState();

	useEffect(() => {
		calculateProgress();
		milestones.forEach((milestone, i) => {
			milestone.position = ((i + 1) / (milestones.length + 1)) * 100;
		});
		if (milestones.length == 0) {
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
						}% - 20px)`}
						top="calc(78%)"
						// transform="translateY(-60%)"
						zIndex="1"
						textAlign="center"
					>
						<Box
							borderRadius="full"
							borderWidth="1px"
							borderColor="green.500"
							bg={milestoneCompleted ? "green.500" : "white"}
							color={milestoneCompleted ? "white" : "green.500"}
							h="2.5rem"
							w="2.5rem"
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
		</Box>
	);
}

export default ProgressBar;
