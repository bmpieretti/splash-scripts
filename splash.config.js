module.exports = {
  extends: '@splash-plus/config-jest',
  commands: [
    {
      name: 'echo',
      resolve: 'local',
      description: 'Runs the echo command',
      command: 'echo "Hello World!"'
    }
  ]
};
