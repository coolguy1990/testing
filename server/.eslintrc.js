module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "promise",
        "mocha"
    ],
    "env": {
      "node": true,
      "mocha": true
    },
    "rules": {
        "mocha/no-exclusive-tests": "error",
        "no-param-reassign": [ 2, { "props": false } ],
        "no-underscore-dangle": 0,
        "no-unused-vars": 2,
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": true, "peerDependencies": true}],
        "max-len": [ 2, 120, 4 ],
        "max-nested-callbacks": [ 2, 6 ],
        "max-params": [ 2, 4 ],
        "max-statements": [ 2, 15 ],
        "new-cap": [2, { "properties": false }],
    }
};
