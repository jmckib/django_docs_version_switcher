if not localStorage.django_version
    # Set default for new users.
    localStorage.django_version = '1.6'

$ ->
    $('ul#doc-versions a').click ->
        localStorage.django_version = $(this).html()

regex = new RegExp("docs.djangoproject.com/[^/]*/([^/]*)")
match = regex.exec window.location

if match and match[1] != localStorage.django_version
    location = String(window.location)
    window.location = location.replace(match[1], localStorage.django_version)
