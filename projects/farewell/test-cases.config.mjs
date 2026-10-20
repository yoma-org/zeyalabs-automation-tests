// App-specific settings for scripts/test-cases.mjs (npm run cases:build -- --app farewell).
export default {
  // README feature groups, by ID prefix: [groupName, [prefix, …]]. Unlisted prefixes go under "Other".
  groups: [
    ['Everyone', ['ACC', 'WALL', 'PERM']],
    ['Leaver', ['CRT', 'STYLE', 'WRITE', 'PUB', 'THEME']],
    ['Colleague', ['MSG']],
    ['People team (admin)', ['DEP', 'MOD', 'BOOK', 'EMP', 'ADM']],
  ],
};
