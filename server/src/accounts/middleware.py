from django.http import HttpResponseForbidden
from jwt import encode,decode
import datetime
from django.middleware import csrf
from accounts.models import MyUser
from django.core.cache import cache

access_key = 'jfbwtv)ws#^vzd)1bklxb32)hc^2d%-cuk8z(qwenbcxnppvv)'
refresh_key = '45e&#bkwjgrad1x_5zdctg0!%0)g5q3%lrp@0u$_6old16a#!s'

class JWTMiddleware:
    def __init__(self,get_response) -> None:
        self.get_response = get_response

    def __call__(self, request):
        #check if login/signup path else assign request.user cache user for few mins too.
        print('inside middleware')
        if request.path != '/accounts/signup/' and request.path != '/accounts/login/':
            print('checking for cookies')
            if request.COOKIES.get('jwt_access'):
                print('checking access token')
                jwt_access = request.COOKIES.get('jwt_access')
                try:
                    payload = decode(jwt=jwt_access,key=access_key,algorithms="HS256")
                    print('access token valid')
                    user_id = payload.get('id')
                    try:
                        user = cache.get(f'user_{user_id}')
                        print('got user from cache')
                    except:
                        user = None
                        print('getting from cache failed')
                    if user is None:
                        print('getting user from db......')
                        user = MyUser.objects.get(id=user_id)
                        try:
                            cache.set(f'user_{user_id}',user,1800)
                        except:
                            print('setting to cache failed')
                    request.user = user
                    if request.method == 'POST' or request.method == 'DELETE' or request.method == 'PUT' or request.method == 'PATCH':
                        csrf_token = csrf.get_token(request)        ###adding csrf token should have just disabled it since we are using httpOnly cookie,with samesite strict
                        request.META['HTTP_X_CSRFTOKEN'] = csrf_token
                except:
                    if request.COOKIES.get('jwt_refresh'):
                        print('checking refresh  toekn and generatoing new access token')
                        request = check_refresh_token(request=request)
                        if not request:
                            response = HttpResponseForbidden('Invalid or expired tokens.')
                            response.delete_cookie('jwt_access')
                            response.delete_cookie('jwt_refresh')
                            return response
            elif request.COOKIES.get('jwt_refresh'):
                print('checking refresh  token and generating new access token')
                request = check_refresh_token(request=request)
                if not request:
                            response = HttpResponseForbidden('Invalid or expired tokevbcbcbvcbns.')
                            response.delete_cookie('jwt_access')
                            response.delete_cookie('jwt_refresh')
                            return response


        response = self.get_response(request)

        if hasattr(request,'new_access_token'):
            response.set_cookie('jwt_access',request.new_access_token,max_age=120,httponly=True,samesite=None)
            print('new access tokn set')

        return response


def check_refresh_token(request):

    jwt_refresh = request.COOKIES.get('jwt_refresh')
    try:
        payload = decode(jwt=jwt_refresh,key=refresh_key,algorithms="HS256")
        user_id = payload.get('id')
        try:
            user = cache.get(f'user_{user_id}')
            print('got user from cache')
        except:
            user = None
            print('getting from cache failed')
        if user is None:
            print('getting user from db......')
            user = MyUser.objects.get(id=user_id)
            try:
                cache.set(f'user_{user_id}',user,1800)
            except:
                print('setting to cache failed')
        request.user = user
        new_access_token = encode(payload={**payload,'exp':datetime.datetime.now()+datetime.timedelta(minutes=2)},key=access_key,algorithm="HS256")
        request.new_access_token = new_access_token
        if request.method == 'POST' or request.method == 'DELETE' or request.method == 'PUT' or request.method == 'PATCH':
            csrf_token = csrf.get_token(request)
            request.META['HTTP_X_CSRFTOKEN'] = csrf_token
        return request
    except:
        return None