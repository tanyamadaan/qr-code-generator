import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Layout } from "./Layout";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { USECASES } from "./assets/constants";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript.js";
import { ThemeSwitch, QrDialog } from "./components";

function App() {
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [selectedUseCaseIndex, setselectedUseCaseIndex] = useState("");
	const [showCodemirror, setShowCodemirror] = useState(false);
	const [qrData, setQrData] = useState("");
	const [showQrDialog, setShowQrDialog] = useState(false);

	const handleThemeChange = () => {
    setTheme(prev => prev ==="light" ? "dark": "light");
  };

	const handleUsecaseChange = (event: SelectChangeEvent) => {
		setselectedUseCaseIndex(event.target.value.toString());
		setShowCodemirror(true);
		setQrData(
			JSON.stringify(USECASES[+selectedUseCaseIndex].initialValue, null, 2)
		);
	};
	const handleOnBeforeChange = (
		_editor: unknown,
		_data: unknown,
		value: string
	) => {
		setQrData(value);
	};
	return (
		<Layout theme={theme}>
			<Container
				sx={{
					minHeight: "100vh",
					display: "flex",
					// justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					py: 2,
				}}
			>
				<img src={"./ondc_logo.png"} />
				<Typography variant="h4">
					<i>Apna</i> <b>QR</b>
				</Typography>
				<Paper
					sx={{
						p: 2,
						maxWidth: 350,
						width: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<Box
						sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
					>
						<ThemeSwitch checked={theme === "dark"} onChange={handleThemeChange}/>
					</Box>
					<Typography color="text.secondary">Select your Usecase:</Typography>
					<FormControl fullWidth>
						<InputLabel id="usecase-select-label">Usecase</InputLabel>
						<Select
							labelId="usecase-select-label"
							id="usecase-select"
							value={selectedUseCaseIndex}
							label="Usecase"
							onChange={handleUsecaseChange}
						>
							{USECASES.map((usecase, idx) => (
								<MenuItem value={idx} key={"usecase-" + idx}>
									{usecase.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Fade in={showCodemirror} timeout={1000} unmountOnExit>
						<Box
							sx={{
								mt: 2,
							}}
						>
							<Typography variant="h6" color="text.secondary">
								Edit the Code:
							</Typography>
							<CodeMirror
								value={qrData}
								// autoCursor={false}
								options={{
									// readOnly: "nocursor",
									theme: "material",
									height: "auto",
									viewportMargin: Infinity,
									mode: {
										name: "javascript",
										json: true,
										statementIndent: 2,
									},
									lineNumbers: true,
									lineWrapping: true,
									indentWithTabs: false,
									tabSize: 2,
								}}
								onBeforeChange={handleOnBeforeChange}
							/>
							<Button
								variant="contained"
								fullWidth
								sx={{ mt: 2 }}
								onClick={() => setShowQrDialog(true)}
							>
								Generate QR
							</Button>
						</Box>
					</Fade>
				</Paper>
				<QrDialog
					onClose={() => setShowQrDialog(false)}
					open={showQrDialog}
					qrData={qrData}
				/>
			</Container>
		</Layout>
	);
}

export default App;
