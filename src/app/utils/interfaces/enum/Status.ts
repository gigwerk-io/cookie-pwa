export const StatusConst = {
  Requested: {
    id: 1,
    name: 'Available',
    color: 'green'
  },
  PendingApproval: {
    id: 2,
    name: 'Pending Approval',
    color: 'teal'
  },
  Approved: {
    id: 3,
    name: 'Approved',
    color: 'blue'
  },
  InProgress: {
    id: 4,
    name: 'In Progress',
    color: 'yellow'
  },
  Complete: {
    id: 5,
    name: 'Complete',
    color: 'red'
  }
}

export interface Status {
  id: 1 | 2 | 3 | 4 | 5;
  name: 'Requested' | 'Available' | 'Pending Approval' | 'Approved' | 'In Progress' | 'Complete';
  color?: string;
}
