from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.core.cache import cache
from rest_framework import status
from spaces.models import Slot, Space
from spaces.serializers import NewSlotSerializer, SpaceSerializer,SlotSerializer
from accounts.serializers import MyUserSerializer

# Create your views here.
@api_view(['GET'])
def middlew(request):
    print('a')
    return Response(data=None,status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def space_destroy(request,pk):
    try:
        space = Space.objects.get(id=pk)
        space.delete()
        return Response(data=None,status=status.HTTP_200_OK)
    except:
        return Response(data=None,status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookslot(request):
    if request.method == 'POST':
        print('insideviweew')
        space_id = int(request.data.get('space_id'))
        slots = request.data.get('slots')
        str_list = slots.split(',')
        slots = [int(x) for x in str_list]
        print(type(slots))
        company_name = request.data.get('company_name')
        user = request.user
        count = 0
        for slot in slots:
            data = {'company_name':company_name,'slot_id':slot,'user':user.id,'space':space_id,'status':'pending'}
            serializer = NewSlotSerializer(data=data)
            if serializer.is_valid():
                count+=1
                serializer.save()
            else:
                return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        return Response(data=None,status=status.HTTP_201_CREATED)
    
        

@api_view(['POST'])
@permission_classes([IsAdminUser])
def space_create(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        serializer = SpaceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=None,status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def spaces_list(request):
    spaces = Space.objects.all()
    serializer = SpaceSerializer(instance=spaces,many=True)
    return Response(data=serializer.data,status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def space_detail(request,pk):
    try:
        space = Space.objects.get(id=pk)
        space_serializer = SpaceSerializer(instance=space)
        slots = space.slots.all()
        slots_serializer = SlotSerializer(instance=slots,many=True)
       
        data = {'space':space_serializer.data,'slots':slots_serializer.data}
        return Response(data=data,status=status.HTTP_200_OK)
    except:
        return Response(data = None,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PATCH','DELETE'])
@permission_classes([IsAdminUser])
def space_action(request):
    if request.method == 'PATCH':
        data = request.data
        print(data)
        if data.get('action') == 'approve':
            slot = Slot.objects.get(id=data.get('id'))
            data = {'status':'booked'}
            serializer = SlotSerializer(instance=slot,data=data,partial=True)
            if serializer.is_valid():
                serializer.update(slot, serializer.validated_data)
                print(serializer.data)
            else:
                print(serializer.errors)
        return Response(data=None,status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def slot_destry(request,pk):
    try:
        slot = Slot.objects.get(id=pk)
        slot.delete()
        return Response(data=None,status=status.HTTP_200_OK)
    except:
        return Response(data=None,status=status.HTTP_404_NOT_FOUND)