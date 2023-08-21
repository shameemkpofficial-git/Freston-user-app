module.exports = {
  plugins: [
    ['module-resolver', {root: ['.']}],
    ['@babel/plugin-transform-for-of', {loose: true}],
    ['@babel/plugin-transform-regenerator'],
    ['@babel/plugin-proposal-numeric-separator'],
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    ['@babel/plugin-proposal-private-methods', {loose: true}],
    ['react-native-reanimated/plugin'],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
