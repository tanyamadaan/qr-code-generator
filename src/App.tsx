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
import { QrDialog } from "./components";
import { TextField } from "@mui/material";

function App() {
	const [theme] = useState<"light" | "dark">("light");
	const [showPlaceholders, setShowPlaceholders] = useState(false);
	const [qrData, setQrData] = useState<object>({});
	const [showQrDialog, setShowQrDialog] = useState(false);
	const [selectedUsecase, setSelectedUsecase] = useState<string>("");

	const handleUsecaseChange = (event: SelectChangeEvent) => {
		setSelectedUsecase(event.target.value);
		setShowPlaceholders(true);
		const usecase = USECASES.filter(
			(usecase) => usecase.name === event.target.value
		)[0].placeholders;
		setQrData(
			usecase
				.map((field) => ({
					[field.name]: field.type == "text" ? field.placeholder : undefined,
				}))
				.reduce((prev, current) => ({ ...prev, ...current }))
		);
	};
	const handlePlaceholderValueChange = (fieldName: string, value: string) => {
		setQrData((prev) => ({ ...prev, [fieldName]: value }));
	};
	const checkPlaceholderValues = () => {
		let flag = false;
		for (const [, value] of Object.entries(qrData)) {
			if (!value) flag = true;
		}
		return flag;
	};

	return (
		<Layout theme={theme}>
			<Container
				sx={{
					minHeight: "100vh",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					py: 2,
				}}
			>
				<img src={"./ondc_logo.png"} />
				<Typography variant="h4">
					<i>QR Code Generator</i>
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
					<Typography color="text.secondary">Select your Usecase:</Typography>
					<FormControl fullWidth>
						<InputLabel id="usecase-select-label">Usecase</InputLabel>
						<Select
							labelId="usecase-select-label"
							id="usecase-select"
							value={selectedUsecase}
							label="Usecase"
							onChange={handleUsecaseChange}
							// placeholder=
						>
							{USECASES.map((usecase, idx) => (
								<MenuItem value={usecase.name} key={"usecase-" + idx}>
									{usecase.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Fade in={showPlaceholders} timeout={1000} unmountOnExit>
						<Box
							sx={{
								mt: 2,
							}}
						>
							<Typography variant="h6" color="text.secondary">
								Edit the placeholders:
							</Typography>

							{USECASES.filter(
								(usecase) => usecase.name === selectedUsecase
							)[0]?.placeholders?.map((field, idx) => (
								<>
									{field.type === "text" && (
										<TextField
											label={field.name}
											placeholder={field.placeholder}
											key={field.name + "-field-" + idx}
											fullWidth
											sx={{ my: 2 }}
											value={qrData[field.name as keyof typeof qrData]}
											onChange={(
												event: React.ChangeEvent<
													HTMLInputElement | HTMLTextAreaElement
												>
											) =>
												handlePlaceholderValueChange(
													field.name,
													event.target.value
												)
											}
										/>
									)}
									{field.type === "select" && (
										<FormControl fullWidth>
											<InputLabel id={field.name + "-select-label"}>
												{field.name}
											</InputLabel>
											<Select
												labelId={field.name + "-select-label"}
												id={field.name + "-select"}
												value={qrData[field.name as keyof typeof qrData] || ''}
												label={field.name}
												onChange={(event: SelectChangeEvent) =>
													handlePlaceholderValueChange(
														field.name,
														event.target.value
													)
												}
												// placeholder=
											>
												{field.options?.map((option, idx) => (
													<MenuItem
														value={option}
														key={field.name + "-option-" + idx}
													>
														{option}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									)}
								</>
							))}

							<Button
								variant="contained"
								fullWidth
								disabled={checkPlaceholderValues()}
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
					qrData={JSON.stringify(qrData)}
				/>
			</Container>
		</Layout>
	);
}

export default App;
