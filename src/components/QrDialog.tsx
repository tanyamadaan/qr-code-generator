
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
	const link = transformJSON(qrData);
  console.log("LINK", link)
	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle>Your QR</DialogTitle>
			<DialogContent>
				<QRCode
					size={250}
					// style={{ height: "auto", maxWidth: "100%", width: "100%" }}
					value={link as string}
          logoImage="./ondc_logo.png"
          logoHeight={80}
          logoWidth={80}
          // fgColor={theme.palette.primary.light}
          eyeColor={theme.palette.primary.dark}
          removeQrCodeBehindLogo
          logoPaddingStyle="circle"
          logoPadding={5}
				/>
			</DialogContent>
		</Dialog>
	);
};
