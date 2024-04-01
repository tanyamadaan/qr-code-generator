import { useState } from "react";
import { Layout } from "./Layout";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent }from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TextField, Button } from "@mui/material";
import { QrDialog } from "./components";
import { USECASES } from "./assets/constants";

function App() {
	const [theme] = useState<"light" | "dark">("light");
	const [showQrDialog, setShowQrDialog] = useState(false);
	const defaultUsecase = USECASES[0];
	const [qrData, setQrData] = useState(
		defaultUsecase.placeholders.map((field) => ({
			[field.name]: field.type == "text" ? field.placeholder : undefined,
		}))
			.reduce((prev, current) => ({ ...prev, ...current }))

		// defaultUsecase.placeholders.reduce((acc, curr) => {
		//   acc[curr.name] = curr.type === "text" ? curr.placeholder : "";
		//   return acc;
		// }, {})
	);

	const handleInputChange = (fieldName: string, value: string) => {
		setQrData((prev) => ({
			...prev,
			[fieldName]: value
		}));
	};

	const handleGenerateQR = () => {
		setShowQrDialog(true);
	};

	return (
		<Layout theme={theme}>
			<Container
				sx={{
					minHeight: "100vh",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					py: 2
				}}
			>
				<img src={"./ondc_logo.png"} alt="logo" />
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
						flexDirection: "column"
					}}
				>
					{/* <Typography color="text.secondary">Select your Usecase:</Typography> */}
					<FormControl fullWidth>
						<InputLabel id="usecase-select-label">Usecase</InputLabel>
						<Select
							labelId="usecase-select-label"
							id="usecase-select"
							value={defaultUsecase.name}
							label={defaultUsecase.name}
							//onChange={handleUsecaseChange}
						// placeholder=
						>
							{USECASES.map((usecase, idx) => (
								<MenuItem value={usecase.name} key={"usecase-" + idx}>
									{usecase.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Typography variant="h6" color="text.secondary">
						Edit the values below:
					</Typography>
					{defaultUsecase.placeholders.map((field, idx) => (
						<>
						{field.type === "text" && (
							
							<TextField
								label={field.placeholder}
								//placeholder={!qrData[field.name] ? field.placeholder : ''}
								placeholder={field.placeholder}
								id="outlined-basic"
								variant="outlined"
								key={field.name + "-field-" + idx}
								fullWidth
								sx={{ my: 2 }}
								//value={qrData[field.name as keyof typeof qrData]}
								onChange={(
									event: React.ChangeEvent<
										HTMLInputElement | HTMLTextAreaElement
									>
								) =>
									handleInputChange(
										field.name,
										event.target.value
									)
								}
							/>
						)}
						{field.type === "select" && (
										<FormControl fullWidth>
											<InputLabel id={field.name + "-select-label"}>
												{field.placeholder}
											</InputLabel>
											<Select
												labelId={field.name + "-select-label"}
												id={field.name + "-select"}
												value={qrData[field.name as keyof typeof qrData] || ''}
												label={field.name}
												onChange={(event: SelectChangeEvent) =>
													handleInputChange(
														field.name,
														event.target.value
													)
												}
												// placeholder=
											>
												{field.options?.map((option, idx) => (
													<MenuItem
														value={option.split('=')[0]}
														key={field.name + "-option-" + idx}
													>
														{option.split('=')[1]}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									)}
						{/* <TextField
							key={field.name + "-field-" + idx}
							// label={field.name}
							placeholder={field.placeholder}
							fullWidth
							sx={{ my: 2 }}
							value={qrData[field.name]}
							onChange={(event) =>
								handleInputChange(field.name, event.target.value)
							}
						/> */}
						</>
					))}
					<Button
						variant="contained"
						fullWidth
						sx={{ mt: 2 }}
						onClick={handleGenerateQR}
					>
						Generate QR
					</Button>
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