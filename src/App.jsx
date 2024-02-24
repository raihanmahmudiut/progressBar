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
	const [milestones, setMilestones] = useState([]);
	const [newMilestoneValue, setNewMilestoneValue] = useState("");

	const handleAddMilestone = () => {
		if (newMilestoneValue != "") {
			const newMilestone = {
				value: parseInt(newMilestoneValue),
			};

			setMilestones([...milestones, newMilestone]);
			setNewMilestoneValue("");
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
					<ProgressBar milestones={milestones}/>
					
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
