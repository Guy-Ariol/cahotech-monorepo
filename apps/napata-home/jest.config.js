module.exports = {
  name: 'napata-home',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/napata-home',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
