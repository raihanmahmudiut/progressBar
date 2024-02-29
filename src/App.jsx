import React, { useEffect, useState } from "react";
import {
	ChakraProvider,
	Input,
	Flex,
	Button,
	Stack,
	HStack,
	Container,
	Divider,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Box,
} from "@chakra-ui/react";
import ProgressBar from "./progressBar";
import { MdCatchingPokemon } from "react-icons/md";

function App() {
	const [milestones, setMilestones] = useState([]);
	const [newMilestoneValue, setNewMilestoneValue] = useState("");
	const [currentProgress, setCurrentProgress] = useState(0);

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
		if (milestones.length == 0) {
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

	const [isDefault, setIsDefault] = useState(true);
	const defaultMilestones = [{ value: 500 }, { value: 1000 }, { value: 1250 }];

	const handleDefaultMilestones = () => {
		setIsDefault(!isDefault);
		setMilestones(isDefault ? defaultMilestones : []);
	};

	return (
		<ChakraProvider>
			<Container>
				<Stack
					p={{ base: 5, md: 10 }}
					minH={"100vh"}
					alignContent="center"
					justifyContent="center"
				>
					<ProgressBar
						milestones={milestones}
						currentProgress={currentProgress}
					/>
					<Divider my={5} />
					<Flex alignItems="center" direction={"column"}>
						<Slider
							defaultValue={0}
							onChange={handleSliderChange}
							min={0}
							max={
								milestones.length > 0
									? milestones[milestones.length - 1].value + 100
									: 100
							}
						>
							<SliderTrack bg="red.100">
								<SliderFilledTrack bg="tomato" />
							</SliderTrack>
							<SliderThumb boxSize={6}>
								<Box color="tomato" as={MdCatchingPokemon} />
							</SliderThumb>
						</Slider>
						<Input
							type="number"
							placeholder="Enter current progress"
							value={currentProgress}
							onChange={handleProgressChange}
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
					<Button colorScheme={"teal"} onClick={handleDefaultMilestones}>
						{isDefault ? "Use" : "Remove"} Default Milestones
					</Button>
				</Stack>
			</Container>
		</ChakraProvider>
	);
}

export default App;
