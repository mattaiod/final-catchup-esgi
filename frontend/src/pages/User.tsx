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
import { createProduct, deleteProduct, getProducts, updateProduct } from '@/controllers/product';
import { ProductReply } from '../../../backend/src/api/product';
import Swal from 'sweetalert2';
import { UserReply } from '../../../backend/src/api/user';
import { changeRoleToAdmin, changeRoleToUser } from '@/controllers/user';

export default function Products() {
  const [users, setUsers] = useState([] as UserReply[]);
  const [loading, setLoading] = useState(true);

  const changeRole = (event: React.MouseEvent<HTMLButtonElement>) => {
    const idUser = event.currentTarget.dataset.id;
    const user = users.find((user) => user._id.toString() == idUser);
    if (!user) {
      return;
    }
    const isAdmin = user.role === 'admin';
    if (isAdmin) {
      changeRoleToUser(idUser!);
    } else {
      changeRoleToAdmin(idUser!);
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'email', width: 130 },
    { field: 'role', headerName: 'role', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell(params) {
        return (
          <div className="flex items-center space-x-2">
            <button onClick={changeRole} data-id={params.row._id} className="p-2 bg-green-500 text-white rounded-md">
              Change Role
            </button>
          </div>
        );
      },
    },
  ];

  if (users.length === 0) {
    setUsers([
      {
        _id: '1',
        email: 'test@test.fr',
        role: 'user',
      },
      {
        _id: '2',
        email: 'test@test2.fr',
        role: 'admin',
      },
      {
        _id: '3',
        email: 'test@test3.fr',
        role: 'user',
      },
      {
        _id: '4',
        email: 'test@test5.fr',
        role: 'user',
      },
    ]);

    setLoading(false);
  }

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div>
            <h1>Users</h1>

            <div className="flex justify-end"></div>
          </div>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={users}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              getRowId={(row) => row._id.toString()}
              pageSizeOptions={[5, 10]}
              checkboxSelection={false}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
