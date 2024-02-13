import DashboardLayout from '../layouts/DashboardLayout';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createStock, getStocks, updateStock } from '@/controllers/stock';
import { useEffect } from 'react';
import { StockReply } from '../../../backend/src/api/stock';
import Swal from 'sweetalert2';
import { ProductReply } from '../../../backend/src/api/product';
import { getProducts } from '@/controllers/product';

export default function Stock() {
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([] as StockReply[]);
  const [products, setProducts] = useState([] as ProductReply[]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);

        getStocks()
          .then((data) => {
            setStocks(data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des stocks :', error);
            return;
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits :', error);
        return;
      });
  }, []);

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
    { field: 'idProduct', headerName: 'ID Produit', width: 120 },
    { field: 'orderNum', headerName: 'Num Commande', width: 150 },
    { field: 'quantity', headerName: 'Quantité', type: 'number', width: 100 },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell(params) {
        return (
          <div className="flex items-center space-x-2">
            {/* <button onClick={handleOpen} data-id={params.row.id} className="p-2 bg-green-500 text-white rounded-md">
              Edit
            </button> */}
            <button className="p-2 bg-red-500 text-white rounded-md">Delete</button>
          </div>
        );
      },
    },
  ];

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    const stockId = event.currentTarget.dataset.id;

    let stock = {
      _id: '',
      idProduct: '',
      orderNum: '',
      quantity: '',
      expirationDate: [],
    } as unknown as StockReply | undefined;

    if (stockId !== 'add') {
      stock = stocks.find((stock) => stock._id.toString() == stockId);
    }
    if (!stock) {
      return;
    }

    Swal.fire({
      title: stockId == 'add' ? 'Add Product' : 'Edit Product',
      html: `
        <form>
          <label for="idProduct" class="block text-sm font-medium text-gray-700">Product</label>
          <select id="idProduct" class="swal2-input my-3">
            <option selected>Choose a product</option>
            ${products.map((product: ProductReply) => {
              return `<option value="${product._id.toString()}" ${
                product._id.toString() == stock?.idProduct ? 'selected' : ''
              }>${product.name}</option>`;
            })}
          </select>

          <label for="orderNum" class="block text-sm font-medium text-gray-700">order number</label>
          <input type="text" id="orderNum" value="${stock.orderNum}" class="swal2-input">
          
          <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="number" id="quantity" value="${stock.quantity}" class="swal2-input">

          <label for="expirationDate" class="block text-sm font-medium text-gray-700">Allergens</label>
          <input type="date" id="expirationDate" value="${stock.expirationDate}" class="swal2-input">
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.isConfirmed) {
        const idProduct = (document.getElementById('idProduct') as HTMLInputElement).value;
        const orderNum = (document.getElementById('orderNum') as HTMLInputElement).value;
        const quantity = (document.getElementById('quantity') as HTMLInputElement).value;
        const expirationDate = (document.getElementById('expirationDate') as HTMLInputElement).value.split(',');

        if (stockId == 'add') {
          const newStock = { idProduct, orderNum, quantity, expirationDate } as unknown as StockReply;

          createStock(newStock).then((response) => {
            setStocks((stocks) => {
              return [...stocks, response];
            });
          });
        } else {
          const updatedStock = { ...stock, idProduct, orderNum, quantity, expirationDate } as unknown as StockReply;

          if (stock) {
            updateStock(stock._id.toString(), updatedStock).then((response) => {
              setStocks((stocks) => {
                return stocks.map((stock: StockReply) => {
                  if (stocks._id.toString() === updatedStock._id.toString()) {
                    return updatedStock;
                  }
                  return stocks;
                });
              });
            });
          }
        }
      }
    });
  };

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div>
            <h1>Stock</h1>

            <div className="flex justify-end">
              <Button variant="contained" onClick={handleOpen} data-id="add">
                Add Stock
              </Button>
            </div>
          </div>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={stocks}
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
              <TextField id="nameCompany" label="Nom de l'entreprise" variant="outlined" />
              <TextField id="orderNum" label="Numéro de commande" variant="outlined" />
              <TextField id="quantity" label="Quantité" value="" variant="outlined" />
            </Box>
          </Modal>
        </div>
      )}
    </DashboardLayout>
  );
}
