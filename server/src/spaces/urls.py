from django.urls import path
from spaces.views import space_create,spaces_list,space_detail,bookslot,space_action,slot_destry,space_destroy

urlpatterns = [
    path('bookslot/',bookslot,name='bookslot'),
    path('action/',space_action,name='action'),
    path('list/',spaces_list,name='spaceslist'),
    path('create/',space_create),
    path('<pk>/',space_detail),
    path('slot/destroy/<pk>/',slot_destry),
    path('destroy/<pk>/',space_destroy),
    
]
