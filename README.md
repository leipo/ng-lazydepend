# Angular lazy dependency injection

If you want to inject later loaded (lazy) modules as dependency into you main app, this angular.module extension is your solution. Simply define the static `angular.app` variable to list your desired module name.

1. Unlike other "hacky" solutions, this will keep all your code intact
2. Extremely useful for traditional MVC's
3. Only load whats needed, nothing more!

[Original post @Leipedesigner.nl (English) ](http://www.leipedesigner.nl/2014/12/using-modularized-angularjs-in-a-traditional-mvc/)

## Example

```html
<html>
<head>

    # Load angular and plugin
    <script src="angular.js"></script>
    <script src="angular-lazydepend.js"></script>

    # Load application bootstrap
    <script src="app.js"></script>
</head>
<body>

    # Lazy load module
    <script src="module.js"></script>
</body>
</html>
```

```javascript
//- app.js
// Note: no dependency is defined
angular.app = 'example'
angular.module('example', []);
```

```javascript
//- module.js
angular.module('module', []);
```

This module will now be automatically injected in our defined main app "example".
