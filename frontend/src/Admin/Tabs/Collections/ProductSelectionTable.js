import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import '../../AdminStyle/AdminGlobalStyle.css'

const ProductSelectionTable = ({ Products, formData, setFormData }) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: 'Select',
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={formData.ProductId.includes(row.original._id)}
            onChange={() => {
              const updatedProductIds = formData.ProductId.includes(row.original._id)
                ? formData.ProductId.filter((id) => id !== row.original._id)
                : [...formData.ProductId, row.original._id];
              setFormData({ ...formData, ProductId: updatedProductIds });
            }}
          />
        ),
      },
      {
        accessorKey: 'Name',
        header: 'Product Name',
      },
      {
        id: 'subcategoryName',
        header: 'Subcategory Name',
        cell: ({ row }) =>
          row.original.SubcategoryId.length > 0
            ? row.original.SubcategoryId.map((subcategory) => subcategory.Name).join(', ')
            : 'N/A',
      },
      {
        id: 'image',
        header: 'Image',
        cell: ({ row }) => (
          <img
            src={row.original.Product_Main_image || 'default-image.jpg'} // Replace with your image URL field or a default image
            alt={row.original.Name}
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />
        ),
      },
      {
        id: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <span style={{ color: row.original.audit.status === 'Active' ? 'green' : 'red' }}>
            {row.original.audit.status || 'Inactive'}
          </span>
        ),
      },
    ],
    [formData.ProductId, setFormData]
  );

  const table = useReactTable({
    data: Products,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="white-bg">
      <div className="table-top-bar">
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="responsive-table-container">
        <table className="responsive-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-end mt-3">
        <button
          className="button Pagination-btn"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          &lt;
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          className="button Pagination-btn"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ProductSelectionTable;
