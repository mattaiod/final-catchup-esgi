import InstanceAxios from '@/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createProduct, deleteProduct, getProducts, updateProduct } from '@/controllers/product';
import { ProductReply } from '../../../backend/src/api/product';
import Swal from 'sweetalert2';

export default function Products() {
  const [products, setProducts] = useState([] as ProductReply[]);
  const [loading, setLoading] = useState(true);

  const allergens: string[] = [
    'Gluten',
    'Peanuts',
    'Tree Nuts',
    'Dairy',
    'Eggs',
    'Soy',
    'Fish',
    'Shellfish',
    'Mustard',
    'Sesame',
    'Sulfites',
    'Lupin',
    'Mollusks',
    'Other',
  ];

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    const productId = event.currentTarget.dataset.id;

    let product = {
      _id: '',
      name: '',
      category: '',
      identifier: '',
      allergens: [],
    } as unknown as ProductReply | undefined;

    if (productId !== 'add') {
      product = products.find((product) => product._id.toString() == productId);
    }
    if (!product) {
      return;
    }

    Swal.fire({
      title: productId == 'add' ? 'Add Product' : 'Edit Product',
      html: `
        <form>
          <label for="productName" class="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" id="productName" value="${product.name}" class="swal2-input">

          <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
          <select id="category" class="swal2-input my-3">
            <option selected>Choose a category</option>
            ${[
              'Electronics',
              'Clothing',
              'Groceries',
              'Beauty',
              'Books',
              'Home Appliances',
              'Sports & Outdoors',
              'Toys & Games',
              'Furniture',
              'Jewelry',
              'Automotive',
              'Health & Wellness',
              'Other',
            ].map((category) => {
              return `<option ${category == product?.category ? 'selected' : ''}>${category}</option>`;
            })}
          </select>

          <label for="identifier" class="block text-sm font-medium text-gray-700">Identifier</label>
          <input type="text" id="identifier" value="${product.identifier}" class="swal2-input">
          
          <label for="allergens" class="block text-sm font-medium text-gray-700">Allergens</label>
          <input type="text" id="allergens" value="${product.allergens.join(',')}" class="swal2-input">
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.isConfirmed) {
        const name = (document.getElementById('productName') as HTMLInputElement).value;
        const category = (document.getElementById('category') as HTMLInputElement).value;
        const identifier = (document.getElementById('identifier') as HTMLInputElement).value;
        const allergens = (document.getElementById('allergens') as HTMLInputElement).value.split(',');
        const id = Math.floor(Math.random() * 1000);

        if (productId == 'add') {
          const newProduct = { name, category, identifier, allergens } as ProductReply;

          createProduct(newProduct).then((response) => {
            setProducts((products) => {
              return [...products, response];
            });
          });
        } else {
          const updatedProduct = { ...product, name, category, identifier, allergens } as ProductReply;

          if (product) {
            updateProduct(product._id.toString(), updatedProduct).then((response) => {
              setProducts((products) => {
                return products.map((product: ProductReply) => {
                  if (product._id.toString() === updatedProduct._id.toString()) {
                    return updatedProduct;
                  }
                  return product;
                });
              });
            });
          }
        }
      }
    });
  };

  const modalDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const productId = event.currentTarget.dataset.id;
    const product = products.find((product) => product._id.toString() == productId);
    if (!product) {
      return;
    }

    Swal.fire({
      title: 'Are you sure you want to delete this product?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product._id.toString()).then((response) => {
          Swal.fire('Product deleted', '', 'success');
          setProducts((products) => {
            return products.filter((product) => product._id.toString() !== productId);
          });
        });
      }
    });
  };

  const columns: GridColDef[] = [
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
            <button onClick={handleOpen} data-id={params.row._id} className="p-2 bg-green-500 text-white rounded-md">
              Edit
            </button>
            <button className="p-2 bg-red-500 text-white rounded-md" onClick={modalDelete} data-id={params.row._id}>
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

            <div className="flex justify-end">
              <Button variant="contained" onClick={handleOpen} data-id="add">
                Add Product
              </Button>
            </div>

            {/* <div className="relative">
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
            </div> */}
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
              checkboxSelection={false}
            />

            <div id="contentModal" className="hidden">
              <TextField id="name" name="name" type="text" required fullWidth variant="outlined" />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
