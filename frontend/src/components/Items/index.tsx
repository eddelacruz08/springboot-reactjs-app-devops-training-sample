import React from "react";
import client from "../../helpers/client.ts";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../Table/index.tsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ItemModal, { DeleteModal } from "./ItemModal.tsx";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import ResponseModal from "./ResponseModal.tsx";

export default function Items() {
  const [data, setData] = React.useState<any>([]);
  const [openModal, setOpenModal] = React.useState<any>({
    isOpen: false,
    method: null,
    data: null,
  });
  const [openResponseModal, setOpenResponseModal] =
    React.useState<boolean>(false);
  const [messageResponse, setMessageResponse] = React.useState<any>({
    title: "",
    response: "",
  });

  const [openDeleteModal, setOpenDeleteModal] = React.useState<any>({
    isOpen: false,
    referenceNo: null,
    id: null,
  });

  const showMessageResponse = (title = "Success", response: any) => {
    setOpenResponseModal(true);
    setMessageResponse({
      title: title,
      response: response,
    });
  };

  const handleSubmit = async (data?: any, method?: string) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("quantity", data.quantity);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("referenceNo", data.referenceNo);

    try {
      if (method === "POST") {
        await client.post("/v1/items", formData).then((response) => {
          showMessageResponse("Success", "Added Successfully!");
          fetchItems();
        });
      } else {
        await client.put(`/v1/items/${data.id}`, data).then((response) => {
          showMessageResponse("Success", "Updated Successfully!");
          fetchItems();
        });
      }
    } catch (error) {
      showMessageResponse(
        "Error",
        `${method === "POST" ? "Adding" : "Uploading"} Failed!`
      );
    } finally {
      setOpenModal({
        isOpen: false,
        id: null,
        method: null,
        data: null,
      });
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await client.delete(`/v1/items/${id}`).then((response) => {
        showMessageResponse("Success", "Deleted Successfully!");
      });
    } catch (error) {
      showMessageResponse("Error", "Deleting Failed!");
    } finally {
      fetchItems();
      setOpenDeleteModal({
        isOpen: false,
        referenceNo: null,
        id: null,
      });
    }
  };

  const fetchItems = async () => {
    try {
      await client.get("/v1/items").then((response) => {
        setData(response.data);
      });
    } catch (error) {
      showMessageResponse("Error", "Fetching Items Failed!");
    }
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Item name", width: 250 },
    { field: "category", headerName: "Category", width: 200 },
    {
      field: "quantity",
      headerName: "Quantity",
      sortable: false,
      width: 100,
    },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "referenceNo",
      headerName: "Reference No",
      type: "number",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "button",
      width: 200,
      renderCell: (info: any) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 2,
            }}>
            <Button
              size="small"
              variant="contained"
              color="warning"
              onClick={() => {
                setOpenModal({
                  isOpen: true,
                  data: info.row,
                  method: "PUT",
                });
              }}>
              Edit
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() =>
                setOpenDeleteModal({
                  isOpen: true,
                  referenceNo: info.row.referenceNo,
                  id: info.row.id,
                })
              }>
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Typography sx={{ fontSize: "25px", mb: 1 }}>Item List</Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpenModal({
                isOpen: true,
                id: null,
                method: "POST",
                data: null,
              });
            }}>
            Add Item
          </Button>
        </CardContent>
      </Card>
      <DataTable rows={data} columns={columns} />
      <ItemModal
        open={openModal.isOpen}
        handleClose={setOpenModal}
        onSubmit={handleSubmit}
        method={openModal.method}
        data={openModal.data}
      />
      <DeleteModal
        open={openDeleteModal.isOpen}
        handleClose={setOpenDeleteModal}
        onSubmit={handleDeleteItem}
        referenceNo={openDeleteModal.referenceNo}
        id={openDeleteModal.id}
      />
      <ResponseModal
        isOpen={openResponseModal}
        modalTitle={messageResponse?.title}
        description={messageResponse?.response}
        onClose={setOpenResponseModal}
      />
    </>
  );
}
