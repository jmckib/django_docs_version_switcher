if not localStorage.django_version
    # Set default for new users.
    localStorage.django_version = '1.6'

$(document).ready ->
    $('ul#doc-versions a').click ->
        localStorage.django_version = $(this).html()

regex = new RegExp("docs.djangoproject.com/[^/]*/([^/]*)")
match = regex.exec window.location

if match and match[1] != localStorage.django_version
    url_string = window.location.href
    new_url_string = url_string.replace(match[1], localStorage.django_version)
    window.location.replace(new_url_string)
    localStorage.display_version_switcher_message = true
else if localStorage.display_version_switcher_message
    localStorage.display_version_switcher_message = false
    display_msg = ->
        $message_div = $("<div class='version-switcher-message'><p>You've been redirected to the docs for <strong>#{ localStorage.django_version }</strong>.&nbsp;&nbsp;<em>- Django Docs Version Switcher</em</p></div>")
        $message_div.appendTo(document.body)

        hide_msg = -> $message_div.fadeOut()
        setTimeout hide_msg, 5000
    $(document).ready(display_msg)
