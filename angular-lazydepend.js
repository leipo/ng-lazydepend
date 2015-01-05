/**
* @desc Based upon work by @Hiddentoa, extended with the ability to lazy inject
* module dependencies to the rootModule
* @author Thomas van der Ploeg <thomas.ploeg@gmail.com>
*/
(function(angular)
{
    var origMethod = angular.module;

    var alreadyRegistered = {};

    /*
    */
    angular.rootModule = null;

    /**
    * Register/fetch a module.
    *
    * @param name {string} module name.
    * @param reqs {array} list of modules this module depends upon.
    * @param configFn {function} config function to run when module loads (only applied for the first call to create this module).
    * @returns {*} the created/existing module.
    */
    angular.module = function(name, reqs, configFn)
    {
        reqs = reqs || [];
        var module = null;

        if (alreadyRegistered[name]) {
            module = origMethod(name);
            module.requires.push.apply(module.requires, reqs);
        } else {
            module = origMethod(name, reqs, configFn);
            alreadyRegistered[name] = module;

            // If not main name, inject module as dependency
            if (angular.rootModule && name !== angular.rootModule) {
                root = origMethod(angular.rootModule);

                if (root.requires.indexOf(name) < 0) {
                    root.requires.push.apply(root.requires, [name]);
                }
            }
        }

        return module;
    };

    angular.modules = function()
    {
        return alreadyRegistered;
    }

})(angular);
