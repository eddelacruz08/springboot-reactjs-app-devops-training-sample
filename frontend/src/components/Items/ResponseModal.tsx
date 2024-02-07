import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const style = {
  position: "absolute" as "absolute",
  fontFamily: "'Work Sans', sans-serif",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 300,
  bgcolor: "background.paper",
  border: "1px solid #254EDB",
  borderRadius: "8px",
  boxShadow: 24,
  p: 2,
};

type ModalProps = {
  isOpen: boolean;
  onClose?: (v: boolean) => void;
  modalTitle?: "Success" | "Error" | "Warning";
  description?: string;
  errors?: string;
};

const ResponseModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  modalTitle,
  description,
  errors,
}) => {
  return (
    <>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box
            sx={{
              mt: 0,
            }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontSize: "25px",
              }}>
              {modalTitle}
            </Typography>
          </Box>
          <br />
          <Box sx={{ mt: 0 }}>
            {modalTitle === "Success" && (
              <CheckCircleOutlineIcon
                sx={{ fontSize: "70px", color: "green", m: 0, p: 0 }}
              />
            )}
            {modalTitle === "Error" && (
              <ErrorOutlineIcon
                sx={{ fontSize: "70px", color: "red", m: 0, p: 0 }}
              />
            )}
            {modalTitle === "Warning" && (
              <WarningAmberIcon
                sx={{ fontSize: "70px", color: "yellow", m: 0, p: 0 }}
              />
            )}
          </Box>
          <Box sx={{ mt: 1 }}>
            <div>{description}</div>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Button
              sx={{
                backgroundColor: "#254EDB",
                color: "white",
                "&:hover": { color: "#254EDB" },
                fontFamily: "'Work Sans', sans-serif",
                border: "1px solid #254EDB",
                ml: 0.5,
                mt: 0.1,
              }}
              size="medium"
              onClick={() => {
                onClose && onClose(false);
              }}>
              {"Done"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ResponseModal;
