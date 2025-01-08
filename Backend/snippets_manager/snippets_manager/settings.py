
from pathlib import Path 
import environ

env = environ.Env()
environ.Env.read_env()
DEBUG=(bool, False) 

# OPENAI_API_KEY = env("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"
# )

import os

OPENAI_API_KEY = os.getenv("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")


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-nyl#)*sw@&jt11f9ho@ebca_el*pnxepc85@+g&)u=@f_d4!tp'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'rest_framework',
    'snippets',
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
     'corsheaders.middleware.CorsMiddleware',
]

CORS_ALLOWED_ORIGINS = [

    'http://localhost:3000',
]

ROOT_URLCONF = 'snippets_manager.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'snippets_manager.wsgi.application'


#Database
#https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}



# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'





