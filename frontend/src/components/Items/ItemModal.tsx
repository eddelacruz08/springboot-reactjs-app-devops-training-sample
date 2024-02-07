import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function makeReferenceNo(length) {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default function ItemModal({
  open,
  handleClose,
  onSubmit,
  method,
  data,
}: any) {
  const [itemName, setItemName] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(0);
  const [refNo, setRefNo] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [categoryItem, setCategoryItem] = React.useState<string>("");

  const handleSubmit = () => {
    onSubmit(
      {
        id: data?.id || null,
        name: itemName,
        quantity,
        referenceNo: method === "POST" ? refNo : data.referenceNo,
        description,
        category: categoryItem,
      },
      method
    );
  };

  const shouldDisableSubmission = (values: any) => {
    const { itemName, quantity, referenceNo, description, categoryItem } =
      values;
    return ![itemName, quantity, referenceNo, description, categoryItem].some(
      (v) => v
    );
  };

  const handleReset = () => {
    setItemName("");
    setQuantity(0);
    setDescription("");
    setCategoryItem("");
  };

  React.useEffect(() => {
    if (open) setRefNo(makeReferenceNo(15));
  }, [open]);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              "& > :not(style)": { width: "100%" },
            }}>
            <Typography sx={{ fontSize: "25px", mb: 1 }}>
              {method === "POST" ? "Add" : "Edit"} Item
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 2,
                mb: 3,
              }}>
              <TextField
                type="text"
                defaultValue={method === "POST" ? "" : data?.name}
                onChange={(v: any) => setItemName(v.target.value)}
                label="Item Name"
                variant="outlined"
              />
              <TextField
                type="number"
                defaultValue={method === "POST" ? "" : data?.quantity}
                onChange={(v: any) => setQuantity(v.target.value)}
                label="Quantity"
                variant="outlined"
              />
              <TextField
                type="text"
                defaultValue={method === "POST" ? "" : data?.description}
                onChange={(v: any) => setDescription(v.target.value)}
                label="Description"
                variant="outlined"
              />
              <TextField
                defaultValue={method === "POST" ? "" : data?.category}
                type="text"
                onChange={(v: any) => setCategoryItem(v.target.value)}
                label="Category Item"
                variant="outlined"
              />
              <TextField
                type="text"
                defaultValue={method === "POST" ? refNo : data?.referenceNo}
                onChange={(v: any) => setCategoryItem(v.target.value)}
                label="Reference No"
                variant="outlined"
                disabled
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Button
                variant="outlined"
                onClick={() => {
                  handleClose &&
                    handleClose({
                      isOpen: false,
                      id: null,
                      method: null,
                    });
                  handleReset();
                }}>
                Cancel
              </Button>
              <Button
                disabled={shouldDisableSubmission({
                  itemName,
                  quantity,
                  referenceNo: refNo,
                  description,
                  categoryItem,
                })}
                variant="contained"
                onClick={() => {
                  handleSubmit();
                  handleReset();
                }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export function DeleteModal({
  open,
  handleClose,
  onSubmit,
  referenceNo,
  id,
}: any) {
  const handleSubmit = () => {
    onSubmit(id);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              "& > :not(style)": { width: "100%" },
            }}>
            <Typography sx={{ fontSize: "18px", mb: 3, textAlign: "center" }}>
              Are you sure you want to delete this item with reference no.:{" "}
              {referenceNo} ?
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}>
              <Button
                variant="outlined"
                onClick={() => {
                  handleClose &&
                    handleClose({ isOpen: false, referenceNo: null });
                }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleSubmit();
                }}>
                Continue
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
