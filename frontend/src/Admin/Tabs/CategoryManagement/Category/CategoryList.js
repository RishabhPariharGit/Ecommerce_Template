import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    getAllCategories,
    deleteCategory,
} from '../../../../Services/AdminServices/Allservices/CategoryService';
import { useNavigate } from 'react-router-dom';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { toast } from 'react-toastify';




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

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const navigate = useNavigate();
    const isFetchedRef = useRef(false);
    const [sorting, setSorting] = useState([]);
    const [columnResizeMode] = useState('onChange');
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchCategories = async () => {
                try {
                    const response = await getAllCategories();
                    if(response.data){
                        setCategories(response.data);
                        toast.success('Categories loaded successfully');
                    }else{
                        setCategories([]);
                        toast.error(response.message || 'Failed to load categories');
                    }
                    
                } catch (err) {
                    console.error('Error fetching categories:', err);
                    toast.error('An error occurred while fetching categories');
                }
            };

            fetchCategories();
            isFetchedRef.current = true;
        }
    }, []);

    const handleEdit = (categorySlug) => {
        navigate(`/admin/Category/edit/${categorySlug}`);
    };

    const handleCreate = () => {
        navigate('/admin/Category/create');
    };

    const handleDelete = async (categoryId) => {
        if (
            window.confirm(
                'Are you sure you want to delete this category? This will also delete all related subcategories and products.'
            )
        ) {
            try {
                const response = await deleteCategory(categoryId);
                setCategories((prev) => prev.filter((c) => c._id !== categoryId));
                toast.success(response.message || 'Category deleted successfully');
            } catch (error) {
                console.error('Error deleting category:', error);
                toast.error(error.response?.data?.message || 'Failed to delete category');
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
                accessorKey: 'Description',
                header: 'Description',
                enableSorting: true,
                enableResizing: true,
                cell: ({ getValue, row, column }) => (
                    <EditableCell initialValue={getValue()} row={row} column={column} />
                ),
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
        data: categories,
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
        columnResizeMode: columnResizeMode,
        enableColumnResizing: true,
        initialState: {
            pagination: {
                pageSize: pageSize,
            },
        },
    });

    return (
        <>

            <div className="table-main-div">
                <div className="white-bg-btn">
                    <p>Categories</p>
                    <button className="button" onClick={handleCreate}>
                        Create Category
                    </button>
                </div>

                <div className="white-bg">
                    <div className="table-sub-head">
                        <p>Main sub Heading</p>
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
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
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
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
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
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={columns.length}
                                                    style={{ textAlign: 'center', padding: '20px' }}
                                                >
                                                    No categories found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            <div className="text-end">
                                <button
                                    className=" button Pagination-btn"
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
        </>
    );
};

export default CategoryList;
