import InstanceAxios from '@/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { ProductReply } from '../../../backend/src/api/product';

export default function Products() {
  const [products, setProducts] = useState([] as ProductReply[]);
  const [editProduct, setEditProduct] = useState<ProductReply | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<ProductReply | null>(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.dataset.id);
    const productId = event.currentTarget.dataset.id as string;
    const product = products.find((product) => product._id.toString() === productId);
    if (product) {
      setEditProduct(product);
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    {
      field: 'identifier',
      headerName: 'Identifier',
      width: 130,
    },
    {
      field: 'allergens',
      headerName: 'Allergens',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell(params) {
        return (
          <div className="flex items-center space-x-2">
            <button onClick={handleOpen} data-id={params.row.id} className="p-2 bg-green-500 text-white rounded-md">
              Edit
            </button>
            <button className="p-2 bg-red-500 text-white rounded-md">Delete</button>
          </div>
        );
      },
    },
  ];

  InstanceAxios.get('/api/products')
    .then((response) => {
      if (response.status === 200) {
        setProducts(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div>
            <h1>Products</h1>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="i-solar-magnifer-linear w-4 h-4 text-gray-500" aria-hidden="true" />
              </div>
              <input
                type="search"
                id="search"
                className="block p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search"
                required
              />
            </div>
          </div>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={products}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField id="name" label="Name" value={editProduct?.name} variant="outlined" />
              <TextField id="category" label="Category" value={editProduct?.category} variant="outlined" />
              <TextField id="identifier" label="Identifier" value={editProduct?.identifier} variant="outlined" />
              <TextField id="allergens" label="Allergens" value={editProduct?.allergens} variant="outlined" />
            </Box>
          </Modal>
        </div>
      )}
    </DashboardLayout>
  );
}
