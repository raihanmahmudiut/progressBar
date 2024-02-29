# React + Vite

# ProgressBar Project

The ProgressBar project is a React component that provides a customizable progress bar with milestone markers. It is built using React and Chakra UI for styling.

## Features

- **Dynamic Progress Bar**: The progress bar adjusts its width based on the current progress.
- **Milestone Markers**: Milestones can be defined with specific values, and the progress bar will display markers for each milestone.
- **Customizable Styling**: The progress bar and milestone markers can be styled using Chakra UI's theming system.
- **Real-time Updates**: The progress bar updates in real-time as the current progress changes.
- **Dynamic Milestone Positions**: The positions of milestones are calculated dynamically to ensure they are evenly spaced across the progress bar.
- **Flexible Milestone Values**: Milestone values do not need to have a proper ratio between them, providing flexibility in defining progress points.

## Usage

To use the ProgressBar component in your React application, follow these steps:

1. Install the necessary dependencies:

   ```bash
   npm install @chakra-ui/react @chakra-ui/icons
   ```

2. Import the ProgressBar component into your project:

   ```javascript
   import ProgressBar from "./progressBar";
   ```

3. Pass the required props to the ProgressBar component:

   ```javascript
   <ProgressBar milestones={milestones} currentProgress={currentProgress} />
   ```

4. Customize the ProgressBar component by adjusting the milestone values and styling as needed.

## Props
Only two props are required.

- `milestones`: An array of milestone objects with `value` properties representing the milestone values. The positions of the milestones are calculated dynamically.

- `currentProgress`: the currentProgress which is any value that you're intending to set milestones for. It can be the customer's total purchase or a player's total XP.


## Example

Here's an example of how you can use the ProgressBar component:

```javascript
import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ProgressBar from "./ProgressBar";

function App() {
	
	//Add necessary functions and states for handling currentProgress value and milestones array of objects.

	return (
		<ChakraProvider>
			<ProgressBar milestones={milestones} currentProgress={currentProgress} />
		</ChakraProvider>
	);
}

export default App;
```

## License

This project is licensed under the [MIT License](LICENSE).
