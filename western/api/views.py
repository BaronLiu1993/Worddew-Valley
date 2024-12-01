import json
from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.shortcuts import redirect, render, redirect
from django.urls import reverse
from urllib.parse import quote_plus, urlencode

oauth = OAuth()

oauth.register(
    "auth0",
    client_id="BQQ9NJG87NXlvFnWopkBItlOcA0OTclF",
    client_secret="vMT0qbyuPMTgiTpKDL5vZyAMxh2m0Va4-nfzM4rRVrHgXvVbUL13tizr3CY22nJF",
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration",
)
