import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    getAllUspss,
    deleteUsps,
} from '../../../../../Services/AdminServices/Allservices/UspsService';
import { useNavigate } from 'react-router-dom';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';



const UspsList = () => {
    const [Usps, setUsps] = useState([]);
  
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
              const response = await getAllUspss();
              if (response.data) {
                const formattedUsps = response.data.map(item => ({
                  ...item,
                  UspsIconCount: item.IconBlocks?.length || 0
                }));
      
                setUsps(formattedUsps);
              } else {
                setUsps([]);
              }
            } catch (error) {
              console.error('Error fetching Uspss:', error);
            }
          };
      
          fetchData();
          isFetchedRef.current = true;
        }
      }, []);
      
    const handleEdit = (id) => {
        navigate(`/admin/Usps/edit/${id}`);
    };

    const handleCreate = () => {
        navigate('/admin/Usps/create');
    };

    const handleDelete = async (id) => {
        if (
            window.confirm(
                'Are you sure you want to delete this Usps? This will also delete related data.'
            )
        ) {
            try {
                await deleteUsps(id);
                setUsps((prev) => prev.filter((text) => text._id !== id));
            } catch (error) {
                console.error('Error deleting Usps:', error);
            }
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'MainHeading',
                header: 'MainHeading',
                enableSorting: true,
                enableResizing: true,
               
            },

            {
                accessorKey: 'UspsIconCount',
                header: 'UpsBlock Count',
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

    const tableNormal = useReactTable({
        data: Usps,
        columns,
        state: { globalFilter, sorting },
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
                <p>Uspss</p>
                <button className="button" onClick={handleCreate}>
                    Create Usps
                </button>
            </div>

            <div className="white-bg">
                <div className="table-sub-head">
                    <p>All  Usps</p>
                </div>
                <hr />
                <div className="p-4">
                    <div className="white-bg">
                        <div className="table-top-bar">
                            <div className="entries-dropdown flex items-center gap-3">
                                <span>Show</span>
                                <select
                                    value={tableNormal.getState().pagination.pageSize}
                                    onChange={(e) => {
                                        const newSize = Number(e.target.value);
                                        tableNormal.setPageSize(newSize);
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
                                    {tableNormal.getHeaderGroups().map((headerGroup) => (
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
                                    {tableNormal.getRowModel().rows.length > 0 ? (
                                        tableNormal.getRowModel().rows.map((row) => (
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
                                                No Uspss found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="text-end">
                            <button
                                className="button Pagination-btn"
                                onClick={() => tableNormal.previousPage()}
                                disabled={!tableNormal.getCanPreviousPage()}
                            >
                                &lt;
                            </button>
                            <span>
                                Page {tableNormal.getState().pagination.pageIndex + 1} of {tableNormal.getPageCount()}
                            </span>
                            <button
                                className="button Pagination-btn"
                                onClick={() => tableNormal.nextPage()}
                                disabled={!tableNormal.getCanNextPage()}
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

export default UspsList;
