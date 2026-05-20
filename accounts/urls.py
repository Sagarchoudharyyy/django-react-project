from django.urls import include, path
from . import views

urlpatterns=[
    path('login/',views.login_page,name='login'),
    path('home/',views.home,name='home'),
    path('logout/',views.logout_page,name='logout'),

    ## API Endpoints
    path('api/signup/',views.signup_api,name='signup_api'),
]