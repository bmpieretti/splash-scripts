module.exports = {
  extends: '@splash-plus/jest-config',
  commands: [
    {
      name: 'echo',
      resolve: 'local',
      description: 'Runs the echo command',
      command: 'echo "Hello World!"'
    }
  ]
};
