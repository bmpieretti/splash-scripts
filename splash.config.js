module.exports = {
  extends: '@splash-plus/config-jest',
  commands: [
    {
      name: 'print',
      resolve: 'local',
      description:
        'Runs the print command, this should fail so I can test failure',
      command: 'print "Hello World!"'
    },
    {
      name: 'echo',
      resolve: 'local',
      description: 'Runs the echo command',
      command: 'echo -n "Hello World!" -n'
    }
  ]
};
