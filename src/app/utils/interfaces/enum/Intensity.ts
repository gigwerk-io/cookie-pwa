export interface Intensity {
  id: 1 | 2 | 3;
  name: 'Easy (less than 2 hours)' | 'Medium (2-4 hours)' | 'Hard (more than 4 hours)';
  color?: string;
  time?: '< 2 Hrs' | '2-4 Hrs' | '> 4 Hrs';
}

export const IntensityConst = {
  '1': {
    id: 1,
    name: 'Easy',
    color: 'green',
    time: '< 2 Hrs'
  },
  '2': {
    id: 2,
    name: 'Medium',
    color: 'yellow',
    time: '2-4 Hrs'
  },
  '3': {
    id: 3,
    name: 'Hard',
    color: 'red',
    time: '> 4 Hrs'
  }
}
