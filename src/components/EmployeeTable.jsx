import React, { useMemo } from 'react';
import { useGlobalFilter, useTable, useRowSelect, usePagination } from 'react-table';
import { COLUMNS3 } from '../menu-items/columns3'
import '../App.css';
import IndeterminateCheckbox from '../icons/Checkbox';
import ActionMenu from '../icons/ActionMenu';

const EmployeeTable = ({globalFilter, data = [], onDelete , onEdit }) => {
  const columns = useMemo(() => COLUMNS3({ onEdit, onDelete }), [onEdit, onDelete]);
  const tableData = useMemo(() => [], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageSize, pageIndex },
    pageCount,
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,

  } = useTable({ columns, data, globalFilter, initialState: { pageSize: 6 } },

    useGlobalFilter,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          )
        },
        ...columns
      ])
    }
  );

  React.useEffect(() => {
    setGlobalFilter(globalFilter);
  }, [globalFilter, setGlobalFilter]);

  return (
    <>
      <div className="tableContainer">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="paginationContainer">
        <span className="prev" onClick={() => previousPage()} disabled={!canPreviousPage}>
          ← Previous
        </span>

        <div className="pageNumbers">
          {[...Array(pageCount)].map((_, i) => {
            const isActive = i === pageIndex;
            return (
              <button
                key={i}
                onClick={() => gotoPage(i)}
                style={{
                  fontWeight: isActive ? 'bold' : 'normal',
                  background: isActive ? '#007bff' : 'transparent',
                  color: isActive ? 'white' : 'black',
                  border: '1px solid #ccc',
                  margin: '0 4px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <span className="next" onClick={() => nextPage()} disabled={!canNextPage}>
          Next →
        </span>
      </div>
    </>
  );

};

export default EmployeeTable;
