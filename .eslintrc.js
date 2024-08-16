module.exports = {
    root: true,
    extends: '@react-native',
    rules: {
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: 'function', next: '*' },
            { blankLine: 'always', prev: '*', next: 'function' },
        ],
    },
};
