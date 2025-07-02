export const COLUMNS2 = [
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
  }
];
