import React, { useMemo } from 'react';
import { useGlobalFilter, useTable, useRowSelect, usePagination, useSortBy } from 'react-table';
import { COLUMNS } from '../menu-items/columns'
import '../App.css';
import IndeterminateCheckbox from '../icons/Checkbox';
import ActionMenu from '../icons/ActionMenu';

const LeadTable = ({ globalFilter,data=[] }) => {
  const columns = useMemo(() => COLUMNS, []);
  const tableData = useMemo(() => data, [data]);

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
    useSortBy,
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
      <div className="leadTableContainer">
        <table {...getTableProps()} className="leadTable">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
      <div className="leadPaginationContainer">
        <span className="leadPrev" onClick={() => previousPage()} disabled={!canPreviousPage}>
          ← Previous
        </span>

        <div className="leadPageNumbers">
          {[...Array(pageCount)].map((_, i) => {
            const isActive = i === pageIndex;
            return (
              <button
                key={i}
                onClick={() => gotoPage(i)}
                className={isActive ? 'active' : ''}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <span className="leadNext" onClick={() => nextPage()} disabled={!canNextPage}>
          Next →
        </span>
      </div>
    </>
  );

};

export default LeadTable;