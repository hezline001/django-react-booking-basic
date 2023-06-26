from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import time
# Create your views here.

@api_view(["GET"])
def test(request):
    print("Got req---")
    time.sleep(5)
    print("After")
    return Response(data="hello world",status=status.HTTP_200_OK)