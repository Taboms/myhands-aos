const colors = {
  WHITE: '#FFFFFF',
  GRAY_200: '#E7E7E7',
  GRAY_500: '#8E8E8E',
  GRAY_700: '#575757',
  RED_800: '#FF5B35',
  BLACK: '#000000',
  MAX: '#FF5B35',
  MED: '#FFC300',
  ETC: '#57B9FF',
  FAIL: '#EDEDED',
};

const GRADE_COLORS = {
  MAX: {
    main: '#FF5B35',
    background: '#FFF4F4',
  },
  MED: {
    main: '#FFC300',
    background: '#FFFCEB',
  },
  OTHER: {
    main: '#56B9FF',
    background: '#E9F9FF',
  },
  FAIL: {
    main: '#BFBFBF',
    background: '#F5F5F5',
  },
} as const;

export {colors, GRADE_COLORS};
