import os
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

application = get_wsgi_application()

# Enable WhiteNoise to serve static files
application = WhiteNoise(application, root=settings.STATIC_ROOT)

# Serve media files (for product images, etc.)
application.add_files(settings.MEDIA_ROOT, prefix='media/')
