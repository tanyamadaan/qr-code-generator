import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

function App() {
	const checkAppInstallation = () => {
		const customUrlScheme = "beckn://ondc";

		// Attempt to open the custom URL scheme
		const iframe = document.createElement("iframe");
		iframe.style.display = "none";
		iframe.src = customUrlScheme;
		document.body.appendChild(iframe);

		// Set a timer to check if the app was opened
		setTimeout(() => {
			// This function will execute after a short delay
			// Handle the case when the app is not installed
			alert("App not installed");
		}, 1000); // Adjust the timeout as needed
	};
	return (
		<Container
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Paper
				sx={{
					p: 2,
					maxWidth: 300,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Typography align="center" mb={2}>
					Click the Button to check if app is installed
				</Typography>
				<Button variant="contained" onClick={checkAppInstallation}>
					Check
				</Button>
			</Paper>
		</Container>
	);
}

export default App;
