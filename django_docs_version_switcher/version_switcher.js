// No coffeescript, no jquery. We can do this.
//
// Resources
// https://gist.github.com/joyrexus/7307312
// http://youmightnotneedjquery.com/

var compareVersions = function(a, b) {
    aParts = a.split('.');
    aMajor = parseInt(aParts[0]);
    aMinor = parseInt(aParts[1]);
    bParts = b.split('.');
    bMajor = parseInt(bParts[0]);
    bMinor = parseInt(bParts[1]);

    if (aMajor < bMajor) { return -1; }
    if (aMajor > bMajor) { return 1; }
    if (aMinor < bMinor) { return -1; }
    if (aMinor > bMinor) { return 1; }

    return 0;    
};

document.addEventListener('DOMContentLoaded', function() {
    var versionElements = document.querySelectorAll('ul#doc-versions a');

    // Get preferred version
    if (!localStorage.django_version) {
        var versions = [];
        versionElements.forEach(function(element) {
            var versionNumber = element.innerHTML;
            if (!isNaN(versionNumber)) {
                versions.push(versionNumber);
            }            
        });

        versions.sort(compareVersions);
        var highestNonDevVersion = versions[versions.length - 1];
        console.log("Preferred version not set. Setting to highest non-dev version: " +
                    highestNonDevVersion);
        localStorage.django_version = highestNonDevVersion;
    }

    // Set click handlers that store new preferred version
    document.querySelectorAll('ul#doc-versions a').forEach(function(element) {
        element.addEventListener('click', function() {
            return localStorage.django_version = element.innerHTML;
        });
    });


    // Determine if we need to redirect to preferred version
    var regex = new RegExp("docs.djangoproject.com/[^/]*/([0-9]+\.[0-9]+|dev)/");
    var match = regex.exec(window.location);
    var preferredVersion = localStorage.django_version;

    if (match && match[1] !== preferredVersion) {
        // Redirect to preferred version
        var url_string = window.location.href;
        var new_url_string = url_string.replace(match[1], preferredVersion);
        window.location.replace(new_url_string);
        localStorage.display_version_switcher_message = true;
        console.log("Redirecting from version " + match[1] + " to " + preferredVersion);
    } else if (localStorage.display_version_switcher_message) {
        // Show message reminding user that the redirect happened
        delete localStorage.display_version_switcher_message;
        var display_msg = function() {
            var messageDiv, messageHTML, hideMsg;
            messageHTML = "<div id='version-switcher-message'><p>You've been redirected to the " +
                "docs for <strong>" + preferredVersion +
                "</strong>.&nbsp;&nbsp;<em>- Django Docs Version Switcher</em</p></div>";
            messageDiv = document.createElement('div');
            messageDiv.innerHTML = messageHTML;
            document.body.appendChild(messageDiv);
            
            hideMsg = function(opacity) {
                messageDiv.style.opacity = opacity;
                opacity = opacity - 0.1;
                if (opacity > 0) {
                    return window.setTimeout(hideMsg, 100, opacity);
                }
            };
            return window.setTimeout(hideMsg, 5000, 0.7);
        };
        display_msg();
    }
});
