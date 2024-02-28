import { DialogContent, DialogTitle, } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { transformJSON } from "../utils";
import QRCode from "react-qr-code";

type QrDialog = {
	onClose: () => void;
	open: boolean;
	qrData: string;
};

export const QrDialog = ({ onClose, open, qrData }: QrDialog) => {
	const link = transformJSON(qrData);
  console.log("LINK", link)
	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle>Your QR</DialogTitle>
			<DialogContent>
				<QRCode
					size={256}
					style={{ height: "auto", maxWidth: "100%", width: "100%" }}
					value={link as string}
					viewBox={`0 0 256 256`}
				/>
			</DialogContent>
		</Dialog>
	);
};
