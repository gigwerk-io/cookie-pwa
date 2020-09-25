export interface Intensity {
  id: 1 | 2 | 3;
  name: 'Easy (less than 2 hours)' | 'Medium (2-4 hours)' | 'Hard (more than 4 hours)';
}

export const IntensityConst = {
  '1': {
    id: 1,
    name: 'Easy',
    color: 'green'
  },
  '2': {
    id: 2,
    name: 'Medium',
    color: 'yellow'
  },
  '3': {
    id: 3,
    name: 'Hard',
    color: 'red'
  }
}
