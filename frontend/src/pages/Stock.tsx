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
import { getStocks } from '@/controllers/stock';
import { useEffect } from 'react';

export default function Stock() {
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]) as any[];

  const [open, setOpen] = useState(false);

  const handleLoadStocks = async () => {
    setLoading(true);
    try {
      const stockData = await getStocks();
      setStocks(stockData);
    } catch (error) {
      console.error('Erreur lors de la récupération des stocks :', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      try {
        const response = await InstanceAxios.get('/api/stocks');
        if (response.status === 200) {
          setStocks(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des stocks :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
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

  //   if (products.length == 0) {
  //     setProducts([
  //       { id: 1, name: 'Snow', identifier: 'Jon', age: 35 },
  //       { id: 2, name: 'Lannister', identifier: 'Cersei', age: 42 },
  //       { id: 3, name: 'Lannister', identifier: 'Jaime', age: 45 },
  //     ]);
  //     setLoading(false);
  //   }

  /*InstanceAxios.get('/api/products')
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
            <h1>Stock</h1>
            <div className="relative mt-4">
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
