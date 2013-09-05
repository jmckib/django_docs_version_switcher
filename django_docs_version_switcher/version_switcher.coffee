if not localStorage.django_version
    # Set default for new users.
    localStorage.django_version = '1.6'

$ ->
    $('ul#doc-versions a').click ->
        localStorage.django_version = $(this).html()

regex = new RegExp("docs.djangoproject.com/[^/]*/([^/]*)")
match = regex.exec window.location

if match and match[1] != localStorage.django_version
    url_string = window.location.href
    new_url_string = url_string.replace(match[1], localStorage.django_version)
    window.location.replace(new_url_string)
