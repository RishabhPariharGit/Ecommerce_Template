import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    getAllImageSliders,
    deleteImageSlider,
} from '../../../../../Services/AdminServices/Allservices/ImageSliderService';
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
        // Optionally sync to backend
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

const ImageSliderList = () => {
    const [imageSliders, setImageSliders] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [columnResizeMode] = useState('onChange');
    const isFetchedRef = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isFetchedRef.current) {
            const fetchData = async () => {
                try {
                    const response = await getAllImageSliders();
                    setImageSliders(response?.data || []);
                } catch (error) {
                    console.error('Error fetching ImageSliders:', error);
                }
            };

            fetchData();
            isFetchedRef.current = true;
        }
    }, []);

    const handleEdit = (id) => {
        navigate(`/admin/ImageSlider/edit/${id}`);
    };

    const handleCreate = () => {
        navigate('/admin/ImageSlider/create');
    };

    const handleDelete = async (id) => {
        if (
            window.confirm(
                'Are you sure you want to delete this ImageSlider? This will also delete related data.'
            )
        ) {
            try {
                await deleteImageSlider(id);
                setImageSliders((prev) => prev.filter((slider) => slider._id !== id));
            } catch (error) {
                console.error('Error deleting ImageSlider:', error);
            }
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'Text',
                header: 'Text',
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
                    <div className="customization-main-btns">
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
        data: imageSliders,
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
        columnResizeMode,
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
                <p>Image Sliders</p>
                <button className="button" onClick={handleCreate}>
                    Create ImageSlider
                </button>
            </div>

            <div className="white-bg">
                <div className="table-sub-head">
                    <p>All Image Sliders</p>
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
                                    const newSize = Number(e.target.value);
                                    table.setPageSize(newSize);
                                    setPageSize(newSize);
                                }}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                            <span>entries</span>
                        </div>

                        <input
                            type="text"
                            placeholder="Search..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="search-input"
                        />
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
                                        <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                                            No ImageSliders found
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

export default ImageSliderList;
