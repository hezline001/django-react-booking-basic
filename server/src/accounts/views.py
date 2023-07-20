import datetime
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.pagination import PageNumberPagination
from accounts.serializers import MyUserSerializer
from rest_framework.response import Response
from rest_framework import status
from accounts.models import MyUser
from django.shortcuts import get_object_or_404
from jwt import encode
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError,ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

access_key = 'jfbwtv)ws#^vzd)1bklxb32)hc^2d%-cuk8z(qwenbcxnppvv)'
refresh_key = '45e&#bkwjgrad1x_5zdctg0!%0)g5q3%lrp@0u$_6old16a#!s'

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request,pk):
    if request.method == 'DELETE':
        try:
            user = MyUser.objects.get(id=pk)
            print(user)
            if user.is_staff:
                print('fgfgfgfhf')
                print(user)
                print(user.is_staff)
                return Response(data='Cannot delete staff',status=status.HTTP_403_FORBIDDEN)
            user.delete()
            return Response(data=None,status=status.HTTP_200_OK)
        except ObjectDoesNotExist :
            return Response(data=None,status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_user(request):
    return Response(data=None,status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def check_admin_user(request):
    return Response(data=None,status=status.HTTP_200_OK)

@api_view(['POST'])
def login_view(request):
    if request.method =='POST':
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = authenticate(email = email, password = password)
            serializer = MyUserSerializer(instance=user)
            payload = serializer.data
            access_token = encode(payload={**payload,'exp':datetime.datetime.now()+datetime.timedelta(minutes=5)},key=access_key,algorithm="HS256")
            refresh_token = encode(payload={**payload,'exp':datetime.datetime.now()+datetime.timedelta(minutes=30)},key=refresh_key,algorithm="HS256")
            response = Response(serializer.data,status=status.HTTP_202_ACCEPTED)
            response.set_cookie('jwt_access',access_token,max_age=300,httponly=True,samesite=None)
            response.set_cookie('jwt_refresh',refresh_token,max_age=1800,httponly=True,samesite=None)
            return response
        except ValidationError as error:
            print(error.message)
            return Response(data=error.message,status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
def logout_view(request):
    response = Response(data=None,status=status.HTTP_200_OK)
    response.set_cookie('jwt_access','',max_age=0,samesite=None,httponly=True)
    response.set_cookie('jwt_refresh','',max_age=0,samesite=None,httponly=True)
    return response

@api_view(['POST'])
def admin_login(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = authenticate(email = email, password = password)
            if not user.is_staff:
                return Response(data='You dont not have permissiondgdfgdgdgdgd',status=status.HTTP_401_UNAUTHORIZED)
            else:
                serializer = MyUserSerializer(instance=user)
                payload = serializer.data
                access_token = encode(payload={**payload,'exp':datetime.datetime.now()+datetime.timedelta(minutes=5)},key=access_key,algorithm="HS256")
                refresh_token = encode(payload={**payload,'exp':datetime.datetime.now()+datetime.timedelta(minutes=30)},key=refresh_key,algorithm="HS256")
                response = Response(serializer.data,status=status.HTTP_202_ACCEPTED)
                response.set_cookie('jwt_access',access_token,max_age=300,httponly=True,samesite=None)
                response.set_cookie('jwt_refresh',refresh_token,max_age=1800,httponly=True,samesite=None)
                return response
        except ValidationError as error:
            print(error.message)
            return Response(data=error.message,status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def signup_view(request):
    if request.method == 'POST':
        data = request.data
        serializer = MyUserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            #create access token and refresh token
            payload = serializer.data
            access_token = encode(payload={**payload,'exp':datetime.datetime.now()+datetime.timedelta(minutes=5)},key=access_key,algorithm="HS256")
            refresh_token = encode(payload={**payload,'exp':datetime.datetime.now()+datetime.timedelta(minutes=10)},key=refresh_key,algorithm="HS256")
            response = Response(serializer.data,status=status.HTTP_201_CREATED)
            response.set_cookie('user',serializer.data,max_age=600,samesite=None)
            
            response.set_cookie('jwt_access',access_token,max_age=300,httponly=True,samesite=None)
            response.set_cookie('jwt_refresh',refresh_token,max_age=600,httponly=True,samesite=None)
            return response
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
@permission_classes([IsAdminUser])
def userlist(request):
    if request.method == 'GET':
        # users = MyUser.objects.all()
        # serializer = MyUserSerializer(users,many = True)
        # print(serializer.data)
        # return Response(serializer.data,status=status.HTTP_200_OK)
        paginator = PageNumberPagination()
        paginator.page_size = 3
        queryset = MyUser.objects.all()
        result_page = paginator.paginate_queryset(queryset=queryset,request=request)
        serializer = MyUserSerializer(result_page,many = True)
        num_pages = paginator.page.paginator.num_pages
        response = paginator.get_paginated_response(serializer.data)
        response.data['num_pages'] = num_pages
        return response
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def user_detail(request,pk):
    print('inside protected view')
    print(request.user)
    user = get_object_or_404(MyUser, pk=pk)
    print(pk)
    print(user)
    serializer = MyUserSerializer(instance=user)
    return Response(serializer.data,status=status.HTTP_200_OK)


    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def test(request):
    pass
