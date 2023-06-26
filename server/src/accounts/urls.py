from django.urls import path
from accounts.views import signup_view,userlist,user_detail,login_view,check_user,logout_view,admin_login,check_admin_user,delete_user

urlpatterns = [
    path('signup/', signup_view, name = 'singup'),
    path('login/',login_view,name='login'),
    path('users/', userlist, name = 'userlist'),
    path('users/<pk>/', user_detail),
    path('checkuser/',check_user,name='checkuser'),
    path('logout/',logout_view,name='logout'),
    path('admin/login/',admin_login,name='admin_login'),
    path('admin/checkuser/',check_admin_user,name='checkadmin'),
    path('users/<pk>/delete/',delete_user,name='deleteuser'),

]
