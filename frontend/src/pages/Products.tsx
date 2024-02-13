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
import { getProducts } from '@/controllers/product';
import { ProductReply } from '../../../backend/src/api/product';

export default function Products() {
  const [products, setProducts] = useState([] as ProductReply[]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState({} as ProductReply);
  const [deleteProduct, setDeleteProduct] = useState({} as ProductReply);

  const [open, setOpen] = useState(false);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    const productId = event.currentTarget.dataset.id;
    const product = products.find((product) => product._id.toString() == productId);
    if (!product) {
      return;
    }
    setEditProduct(product);
    setOpen(true);
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

  if (products.length === 0) {
    setProducts([
      {
        _id: 1,
        name: 'Product 1',
        category: 'Automotive',
        identifier: 'Identifier 1',
        allergens: ['Allergen 1', 'Allergen 2'],
      },
      {
        _id: 2,
        name: 'Product 2',
        category: 'Beauty',
        identifier: 'Identifier 2',
        allergens: ['Allergen 1', 'Allergen 2'],
      },
      {
        _id: 3,
        name: 'Product 3',
        category: 'Books',
        identifier: 'Identifier 3',
        allergens: ['Allergen 1', 'Allergen 2'],
      },
      {
        _id: 4,
        name: 'Product 4',
        category: 'Clothing',
        identifier: 'Identifier 4',
        allergens: ['Allergen 1', 'Allergen 2'],
      },
      {
        _id: 5,
        name: 'Product 5',
        category: 'Electronics',
        identifier: 'Identifier 5',
        allergens: ['Allergen 1', 'Allergen 2'],
      },
    ]);

    setLoading(false);
  }

  /*getProducts()
    .then((response) => {
      console.log(response);
      //setProducts(response);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });*/

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
              getRowId={(row) => row._id.toString()}
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
              <TextField id="name" label="Name" value={editProduct.name} variant="outlined" />
              <TextField id="category" label="Category" value={editProduct.category} variant="outlined" />
              <TextField id="identifier" label="Identifier" value={editProduct.identifier} variant="outlined" />
              <TextField id="allergens" label="Allergens" value={editProduct.allergens} variant="outlined" />
            </Box>
          </Modal>
        </div>
      )}
    </DashboardLayout>
  );
}
