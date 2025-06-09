import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Layout } from "./Layout";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { USECASES } from "./assets/constants";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { Controlled as CodeMirror } from "react-codemirror2";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { QrDialog } from "./components";
import { finaldata } from "./utils";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript.js";

function App() {
  const [theme] = useState<"light" | "dark">("light");
  const [selectedUseCaseIndex, setselectedUseCaseIndex] = useState("");
  const [showCodemirror, setShowCodemirror] = useState(false);
  const [qrData, setQrData] = useState<any>({});
  const [qrkey, setqrkey] = useState<any>({});
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [editType, setEditType] = useState<"json" | "placeholders">("json");

  const handleUsecaseChange = (event: SelectChangeEvent) => {
    const selectedIndex = event.target.value.toString();
    setselectedUseCaseIndex(selectedIndex);
    setShowCodemirror(true);
    updateQrData(selectedIndex);
    console.log(editType)
    console.log(qrData)
  };

  const handleEditTypeChange = () => {
    setEditType(prev => (prev === "json" ? "placeholders" : "json"));
  };

  useEffect(() => {
    console.log(selectedUseCaseIndex)
    console.log(editType)
    if (selectedUseCaseIndex !== "") {
      updateQrData(selectedUseCaseIndex);
    }
  }, [selectedUseCaseIndex, editType]);

  const updateQrData = (selectedIndex: string) => {
    const schema = JSON.stringify(USECASES[+selectedIndex].initialValue, null, 2)
    setqrkey(JSON.stringify(USECASES[+selectedIndex].placeholders, null, 2));
    if (editType === "json") {
      setQrData(schema);
      console.log(qrData)
    } else {
      const mergedObj = finaldata(JSON.parse(schema))
      console.log(qrkey)
      setQrData(JSON.stringify(mergedObj));
      console.log(qrkey)
    }
  };

  useEffect(() => {
    console.log("Edit type:", qrData);
    try {
      const parsedData = JSON.parse(qrData);
      Object.keys(parsedData).forEach((key) => {
        console.log(key, ":", parsedData[key]);
        console.log(qrkey)
        console.log(JSON.parse(qrkey)[key])
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [qrData, qrkey]);
   

  const handleOnBeforeChange = (_editor: unknown, _data: unknown, value: string) => {
    setQrData(value);
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
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <FormControlLabel
              control={<Switch checked={editType === "placeholders"} onChange={handleEditTypeChange} />}
              label="Placeholders"
            />
          </Box>
          <Fade in={showCodemirror} timeout={1000} unmountOnExit>
            <Box
              sx={{
                mt: 2
              }}
            >
              <Typography variant="h6" color="text.secondary">
                {editType === "json" ? "Edit the JSON code:" : "Edit the placeholders:"}
              </Typography>
              {editType === "json" ? (
                <CodeMirror
                  value={qrData}
                  options={{
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
              ) : (
                Object.entries(JSON.parse(qrData)).map(([key]) => (
                  <div key={key}>
                    <Typography variant="subtitle1" color="text.secondary">{JSON.parse(qrkey)[key]}:</Typography>
                      <input
                        key={qrkey[key]}
                        type="text"
                        // placeholder={placeholder}
                        value={JSON.parse(qrData)[key]}
                        onChange={(e) => {
                          const newData = JSON.parse(qrData);
                          newData[key] = e.target.value;
                          console.log(newData)
                          setQrData(JSON.stringify(newData, null, 2));
                        }}
                        style={{ marginBottom: "10px" }}
                      />
                  </div>
                ))
              )}
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