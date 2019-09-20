module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "rules": {
      // Possible errors
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "valid-typeof": "error",

      // Best Practices
        "block-scoped-var": "error",
        "curly": [
          "error",
          "all"
        ],
        "dot-location": [
          "error",
          "property"
        ],
        "eqeqeq": [
          "error",
          "always",
          {
            "null": "ignore"
          }
        ],
        "no-else-return": "warn",
        "no-eval": "error",
        "no-multi-spaces": "error",
        "yoda": "error",

        // Variables
        "no-undef": "error",
        "no-unused-vars": "error",

        //Stylistic issues
        "array-bracket-spacing": [
          "error",
          "always",
          {
            "objectsInArrays": false,
            "arraysInArrays": false
          }
        ],
        "block-spacing": "error",
        "brace-style": "error",
        "comma-spacing": "error",
        "comma-style": "error",
        "computed-property-spacing": [
          "error",
          "always"
        ],
        "func-call-spacing": "error",
        "indent": [
          "error",
          4,
          {
            "SwitchCase": 1
          }
        ],
        "jsx-quotes": [
          "error",
          "prefer-double"
        ],
        "key-spacing": [
          "error",
          {
            "multiLine": {
              "beforeColon": false,
              "afterColon": true,
              "mode": "minimum"
            },
            "singleLine": {
              "beforeColon": false,
              "afterColon": true,
              "mode": "strict"
            }
          }
        ],
        "keyword-spacing": "error",
        "max-len": [
          "error",
          {
            "code": 120,
            "ignoreUrls": true
          }
        ],
        "max-params": [
          "error",
          {
            "max": 6
          }
        ],
        "max-statements-per-line": "error",
        "no-multiple-empty-lines": "error",
        "no-trailing-spaces": "error",
        "no-whitespace-before-property": "error",
        "padded-blocks": [
          "error",
          {
            "classes": "always"
          }
        ],
        "quotes": [
          "error",
          "double",
          {
            "allowTemplateLiterals": true
          }
        ],
        "semi": "error",
        "space-before-blocks": "error",
        "space-before-function-paren": "error",
        "space-infix-ops": "error",
        "space-unary-ops": [
          "error",
          {
            "words": true,
            "nonwords": false
          }
        ],

        // ES6
        "arrow-parens": [
          "error",
          "as-needed"
        ],
        "arrow-spacing": "error",
        "constructor-super": "error",
        "no-const-assign": "error",
        "no-new-symbol": "error",
        "no-this-before-super": "error",
        "no-var": "error",
        "prefer-const": "warn",

        // Plugins 
       "react/prefer-es6-class": "error",
       "react/jsx-uses-vars": "error",
       "react/jsx-uses-react": "error",
       "react/react-in-jsx-scope": "error"
      }
      
};