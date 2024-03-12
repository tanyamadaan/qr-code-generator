import React, { useState, useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import { transformJSON } from "../utils";
import { QRCode } from 'react-qrcode-logo';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import useTheme from "@mui/material/styles/useTheme";

type QrDialog = {
	onClose: () => void;
	open: boolean;
	qrData: string;
};

export const QrDialog = ({ onClose, open, qrData }: QrDialog) => {
  const theme = useTheme()

  // Function to calculate logo dimensions and position
const calculateLogoProps = () => {
	// Load the logo image
	const logo = new Image();
	logo.src = "./ondc_logo.png";
	logo.onload = () => {
		// Define base width for the logo
		const basewidth = 400;
		// Calculate new dimensions for the logo
		const wpercent = basewidth / logo.width;
		console.log("wpercent")
		console.log(wpercent)
		const hsize = logo.height * wpercent;
		console.log(hsize)
		// Calculate logo position to center it on the QR code
		const logoPosition = {
			x: (400 - basewidth) / 2,
			y: (400 - hsize) / 2
		};

		// Set logo dimensions and position
		setLogoProps({
			logoImage: "./ondc_logo.png",
			logoHeight: hsize,
			logoWidth: basewidth,
			logoPosition: logoPosition
		});
	};
};

useEffect(() => {
	// Call function to calculate logo dimensions and position when component mounts
	calculateLogoProps();
}, []);

// State to store logo properties
const [logoProps, setLogoProps] = useState({
	logoImage: "",
	logoHeight: 0,
	logoWidth: 0,
	logoPosition: { x: 0, y: 0 }
});

const link = transformJSON(qrData);


  console.log("LINK", link)
	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle>ONDC QR Code</DialogTitle>
			<DialogContent>
				<QRCode
					size={350}
					ecLevel="H"
					quietZone={4}
					// style={{ height: "auto", maxWidth: "100%", width: "100%" }}
					value={link as string}
					logoImage={logoProps.logoImage}
                    logoHeight={logoProps.logoHeight}
                    logoWidth={logoProps.logoWidth}
                    // logoPositionX={logoProps.logoPosition.x}
                    // logoPositionY={logoProps.logoPosition.y}
        //   logoImage="./ondc_logo.png"
        //   logoHeight={80}
        //   logoWidth={80}
        //   // fgColor={theme.palette.primary.light}
        //   //eyeColor={theme.palette.primary.dark}
        //   removeQrCodeBehindLogo
        //   logoPaddingStyle="circle"
        //   logoPadding={5}
				/>
			</DialogContent>
		</Dialog>
	);
};
