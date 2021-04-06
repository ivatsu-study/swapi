module.exports = {
  extends: ['airbnb-typescript'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    }
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "react/react-in-jsx-scope": "off",
  }
};
