const config = [
  {
    input: { generate: "bitLib/utils/generate.js" },
    output: {
      entryFileNames: `[name].js`,
      dir: "/Users/user/DemoProjects/common-client-js/lib/utils",
      format: "umd",
      sourcemap: false,
      name: "generate-[name]",
    },
  },
  {
    input: { string: "bitLib/utils/string.js" },
    output: {
      entryFileNames: `[name].js`,
      dir: "/Users/user/DemoProjects/common-client-js/lib/utils",
      format: "umd",
      sourcemap: false,
      name: "string-[name]",
    },
  },
  {
    input: { pet: "bitLib/models/pet.js" },
    output: {
      entryFileNames: `[name].js`,
      dir: "/Users/user/DemoProjects/common-client-js/lib/models",
      format: "umd",
      sourcemap: false,
      name: "pet-[name]",
    },
  },
  {
    input: { user: "bitLib/models/user.js" },
    output: {
      entryFileNames: `[name].js`,
      dir: "/Users/user/DemoProjects/common-client-js/lib/models",
      format: "umd",
      sourcemap: false,
      name: "user-[name]",
    },
  },
];

export default config;
