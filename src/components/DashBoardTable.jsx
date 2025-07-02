import React, { useMemo } from 'react';
import { useGlobalFilter, useTable, useRowSelect, usePagination } from 'react-table';
import { COLUMNS2 } from '../menu-items/columns2';
import '../App.css';
import IndeterminateCheckbox from '../icons/Checkbox';
import ActionMenu from '../icons/ActionMenu';

const DashBoardTable = ({ globalFilter,data }) => {
  const columns = useMemo(() => COLUMNS2, []);
  const tableData = useMemo(() => data || [], [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageSize }
  } = useTable({ columns, data, globalFilter, initialState: { pageSize: 5 } },

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
    </>
  );

};

export default DashBoardTable;
