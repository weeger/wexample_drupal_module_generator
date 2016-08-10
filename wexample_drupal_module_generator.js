(function ($) {
  $(function () {
    var i, item, split, text, $form = $('#wexample-drupal-module-generator-form'),
      domDest = document.getElementById('wexample_drupal_module_generator-info'),
      domName = document.getElementById('edit-name'),
      domCore = document.getElementById('edit-core'),
      domVersion = document.getElementById('edit-version'),
      domDescription = document.getElementById('edit-description'),
      domPackage = document.getElementById('edit-package'),
      domDependencies = document.getElementById('edit-dependencies'),
      generate = function () {
        if (domCore.value === '7.x') {
          text = 'name = ' + domName.value + "\n" +
            'description = ' + domDescription.value + "\n" +
            'core = ' + domCore.value + "\n" +
            'version = ' + domCore.value + '-' + domVersion.value + "\n";
          if (domPackage.value) {
            text += 'package = ' + domPackage.value + "\n";
          }
          split = domDependencies.value.split(',');
          for (i = 0; item = split[i++];) {
            text += 'dependencies[] = ' + item + "\n";
          }
          domDest.innerHTML = text;
          // Save.
          sessionStorage.setItem('wexample_drupal_module_generator_saved', JSON.stringify({
            name: domName.value,
            description: domDescription.value,
            core: domCore.value,
            version: domVersion.value,
            package: domPackage.value,
            dependencies: domDependencies.value
          }));
        }
      };
    // Bind.
    $form.find('input[type=text]').bind('keyup', generate);
    $form.find('select').change(generate);
    var saved = JSON.parse(sessionStorage.getItem('wexample_drupal_module_generator_saved'));
    if (saved) {
      // Fill with saved values.
      domName.value = saved.name;
      domDescription.value = saved.description;
      domCore.value = saved.core;
      domVersion.value = saved.version;
      domPackage.value = saved.package;
      domDependencies.value = saved.dependencies;
      // Refresh.
      generate();
    }
  })
}(jQuery));
