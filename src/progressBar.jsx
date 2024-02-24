import { useEffect } from "react";
import { Box, Progress, Text, Icon, Divider } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

function ProgressBar({
  milestones,
  currentProgress,
  calculateProgress,
  progress,
}) {
  useEffect(() => {
    calculateProgress();
  }, [milestones, currentProgress]);

  return (
    <Box textAlign="center" position="relative">
      <Text>
        Milestones:{" "}
        {milestones.map((milestone) => milestone.value).join(", ")}
      </Text>
      <Divider my={10} />
      <Progress value={progress} colorScheme="green" />

      {milestones.map((milestone, index) => {
        const milestoneCompleted = currentProgress >= milestone.value;

        return (
          <Box
            key={index}
            position="absolute"
            left={`calc(${(index + 1) / (milestones.length + 1) * 100}% - 12px)`}
            top="calc(95%)"
            transform="translateY(-50%)"
            zIndex="1"
            textAlign="center"
          >
            <Box
              borderRadius="full"
              borderWidth="1px"
              borderColor= "green.500"
              bg={milestoneCompleted ? "green.500" : "white"}
              color={milestoneCompleted ? "white" : "green.500"}
              h="2rem"
              w="2rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={CheckIcon} color={milestoneCompleted ? "white" : "green.500"} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default ProgressBar;
