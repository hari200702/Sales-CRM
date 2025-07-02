import ActionMenu from "../icons/ActionMenu";


export const COLUMNS3 = ({ onEdit, onDelete }) => [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ row }) => (
      <div className="nameCell">
        <div className="name">{row.original.name}</div>
        <div className="email">{row.original.email}</div>
      </div>
    )
  },
  {
    Header: 'Employee ID',
    accessor: 'employeeId',
  },
  {
    Header: 'Assigned Leads',
    accessor: 'assignedLeads',
  },
  {
    Header: 'Closed Leads',
    accessor: 'closedLeads',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: '',
    accessor: 'actions',
    Cell: ({ row }) => (
      <ActionMenu
        row={row}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];