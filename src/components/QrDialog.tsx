import { useState, useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import { transformJSON } from "../utils";
import { QRCode } from 'react-qrcode-logo';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

type QrDialog = {
    onClose: () => void;
    open: boolean;
    qrData: string;
};

export const QrDialog = ({ onClose, open, qrData }: QrDialog) => {
    // State to store logo properties
    const [logoProps, setLogoProps] = useState({
        logoImage: "",
        logoHeight: 0,
        logoWidth: 0,
    });
	console.log("HERE")

    useEffect(() => {
        // Load the logo image
        const logo = new Image();
        logo.src = "./logo.png";

        logo.onload = () => {
            // Define base width for the logo
            const basewidth = 300;
            // Calculate new dimensions for the logo
            const wpercent = basewidth / logo.width;
			console.log(logo.width)
            const hsize = logo.height * wpercent;

			console.log(logo.height)
            // Create a canvas element to resize the logo
            const canvas = document.createElement('canvas');
            canvas.width = basewidth;
            canvas.height = hsize;
			console.log(hsize)
            const ctx = canvas.getContext('2d');
			console.log(ctx)

            // Use Lanczos interpolation to resize the logo
            if (ctx) {
                // Use Lanczos interpolation to resize the logo
                ctx.drawImage(logo, 0, 0, basewidth, hsize);
                const resizedLogoDataURL = canvas.toDataURL();

				console.log("Actual Logo:", logo);
                console.log("Resized Logo:", resizedLogoDataURL);
                // Set logo dimensions and data URL
                setLogoProps({
                    logoImage: resizedLogoDataURL,
                    logoHeight: hsize,
                    logoWidth: basewidth,
                });
            }
        };
    }, []);

    const link = transformJSON(qrData);

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold', color: '#728FCE', fontSize: '40px' }}>ONDC QR se Bharat Khulega</DialogTitle>
            <DialogContent>
                <QRCode
                    size={550}
                    ecLevel="H"
                    quietZone={4}
                    value={link as string}
                    logoImage={logoProps.logoImage}
                    logoHeight={logoProps.logoHeight}
                    logoWidth={logoProps.logoWidth}
                />
            </DialogContent>
        </Dialog>
    );
};