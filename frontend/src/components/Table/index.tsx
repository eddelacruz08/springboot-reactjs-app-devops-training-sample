import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ rows, columns }: any) {
  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <DataGrid
        rows={rows || []}
        columns={columns || []}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15, 20]}
        sx={{ width: "100%" }}
      />
    </div>
  );
}
