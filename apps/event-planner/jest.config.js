module.exports = {
  name: 'event-planner',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/event-planner',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
