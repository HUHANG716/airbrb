import { theme as _theme } from 'antd';

const { darkAlgorithm } = _theme;

const theme = {
  components: {
    Typography: {
      titleMarginBottom: 0,
    },
  },
  token: {
    colorPrimary: '#13c2c2',
    colorInfo: '#13c2c2',
    borderRadius: 0,
    wireframe: true,
  },
  algorithm: darkAlgorithm,
};
export default theme;
