module.exports = {
  name: 'chimmo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/chimmo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
