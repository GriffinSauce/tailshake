module.exports = {
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
  moduleDirectories: ["node_modules", "src", "test"],
};
