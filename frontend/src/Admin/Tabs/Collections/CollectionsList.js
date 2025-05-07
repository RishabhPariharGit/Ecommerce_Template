import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    getAllCollections,
    deleteCollection,
} from '../../../Services/AdminServices/Allservices/CollectionService';
import { useNavigate } from 'react-router-dom';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { toast } from 'react-toastify'; // ✅ Import toast



const CollectionList = () => {
    const [Collections, setCollections] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();
    const [columnResizeMode] = useState('onChange');
    const isFetchedRef = useRef(false);

    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchCollections = async () => {
                try {
                    const response = await getAllCollections();
                    setCollections(response?.data || []);
                    toast.success('Collections loaded successfully'); // ✅ Success toast
                } catch (err) {
                    console.error('Error fetching Collections:', err);
                    toast.error('Failed to load Collections'); // ❌ Error toast
                }
            };
            fetchCollections();
            isFetchedRef.current = true;
        }
    }, []);

    const handleEdit = (Id) => {
        navigate(`/admin/Collection/Edit/${Id}`);
    };

    const handleCreate = () => {
        navigate('/admin/Collection/create');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this Collection?')) {
            try {
                await deleteCollection(id);
                setCollections((prev) => prev.filter((s) => s._id !== id));
                toast.success('Collection deleted successfully'); // ✅ Success toast
            } catch (err) {
                console.error('Error deleting Collection:', err);
                toast.error('Failed to delete Collection'); // ❌ Error toast
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
               
            },
            
            {
                accessorKey: 'Add_collections',
                header: 'Add In collections',
                enableSorting: true,
                enableResizing: true,
               
            },
            {
                accessorKey: 'Add_Products',
                header: 'Add In Product Card',
                enableSorting: true,
                enableResizing: true,
               
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
            
            {
                id: 'actions',
                header: 'Actions',
                enableSorting: false,
                enableResizing: false,
                cell: ({ row }) => (
                    <div className="action-buttons">
                        <button
                            className="gridbutton"
                            onClick={() => handleEdit(row.original._id)}
                        >
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
        data: Collections,
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
        <div className="table-main-div">
            <div className="white-bg-btn">
                <p>Collections</p>
                <button className="button" onClick={handleCreate}>
                    Create Collection
                </button>
            </div>

            <div className="white-bg">
                <div className="table-sub-head">
                    <p>All Collections</p>
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
                                        table
                                            .getRowModel()
                                            .rows.slice(0, pageSize)
                                            .map((row) => (
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
                                                No Collections found
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
    );
};

export default CollectionList;
