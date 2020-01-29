const presets = [
  [
    '@babel/env',
    {
      targets: {
        android: '67',
        edge: '15',
        firefox: '60',
        chrome: '64',
        safari: '11.1',
        ios: '12',
        esmodules: true,
      },
      useBuiltIns: 'usage',
      corejs: '3.4.1',
    },
  ],
];

module.exports = { presets };
