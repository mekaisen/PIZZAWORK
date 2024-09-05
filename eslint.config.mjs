import { eslint } from '@siberiacancode/eslint';

export default eslint(
  {
    typescript: true,
    jsx: true,
    jsxA11y: true,
    react: true,
    stylistic: true
  },
  {
    rules: {
      'node/prefer-global/process': ['error', 'always'],
      'siberiacancode-react/prop-types': 'off',
      'style/linebreak-style': 'off',
      'react/no-duplicate-key': 'off',
      'siberiacancode-react/display-name': 'off'

    }
  }
);
