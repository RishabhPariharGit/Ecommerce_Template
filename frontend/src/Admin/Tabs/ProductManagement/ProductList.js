import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    getAllProducts,
    deleteProduct,
} from '../../../Services/AdminServices/Allservices/ProductService';
import { useNavigate } from 'react-router-dom';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';

const EditableCell = ({ initialValue, row, column }) => {
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
        row.original[column.id] = value;
        // Optional: send update to backend here
    };

    return (
        <input
            className="editable-cell"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
        />
    );
};

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const isFetchedRef = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchProducts = async () => {
                try {
                    const response = await getAllProducts();
                    setProducts(response.data || []);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            };
            fetchProducts();
            isFetchedRef.current = true;
        }
    }, []);

    const handleEdit = (productSlug) => {
        navigate(`/admin/Product/edit/${productSlug}`);
    };

    const handleCreate = () => {
        navigate('/admin/Product/create');
    };

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await deleteProduct(productId);
                if (response) {
                    alert(response.message);
                    setProducts((prev) => prev.filter((p) => p._id !== productId));
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'Name',
                header: 'Name',
                enableSorting: true,
                enableResizing: true,
                cell: ({ getValue, row, column }) => (
                    <EditableCell initialValue={getValue()} row={row} column={column} />
                ),
            },
            {
                accessorKey: 'Price',
                header: 'Price',
                enableSorting: true,
                enableResizing: true,
                cell: ({ getValue }) => `₹ ${getValue()}`, // you can make this editable too if needed
            },
            {
                accessorKey: 'SKU',
                header: 'SKU',
                enableSorting: true,
                enableResizing: true,
            },
            {
                accessorKey: 'CategoryName',
                header: 'Category',
                enableSorting: true,
                enableResizing: true,
            },
            {
                id: 'actions',
                header: 'Actions',
                enableSorting: false,
                enableResizing: false,
                cell: ({ row }) => (
                    <div className="action-buttons">
                        <button className="gridbutton" onClick={() => handleEdit(row.original.Slug)}>
                            Edit
                        </button>
                        <button
                            className="gridbutton delete-button"
                            onClick={() => handleDelete(row.original._id)}
                        >
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: products,
        columns,
        state: {
            globalFilter,
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: 'onChange',
        enableColumnResizing: true,
        initialState: {
            pagination: {
                pageSize: pageSize,
            },
        },
    });

    return (
        <div className="table-main-div">
            <div className="white-bg-btn">
                <p>Product List</p>
                <button className="button" onClick={handleCreate}>
                    Create Product
                </button>
            </div>

            <div className="white-bg">
                <div className="table-sub-head">
                    <p>Manage all products here</p>
                </div>
                <hr />
                <div className="p-4">
                <div className="white-bg">
                    <div className="table-top-bar">
                        <div className="entries-dropdown flex items-center gap-3">
                            <span>Show</span>
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value));
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[5, 10, 25, 50].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                            <span>entries</span>
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Search..."
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
                                            <th
                                                key={header.id}
                                                style={{ width: header.getSize() }}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() && (
                                                    <span className="sort-icon">
                                                        {header.column.getIsSorted() === 'asc' && '▲'}
                                                        {header.column.getIsSorted() === 'desc' && '▼'}
                                                        {!header.column.getIsSorted() && '▼'}
                                                    </span>
                                                )}
                                                {header.column.getCanResize() && (
                                                    <div
                                                        onMouseDown={header.getResizeHandler()}
                                                        onTouchStart={header.getResizeHandler()}
                                                        className="resizer"
                                                    />
                                                )}
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

                    <div className="text-end">
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
                </div>
            </div>
        </div>
    );
};

export default ProductList;
