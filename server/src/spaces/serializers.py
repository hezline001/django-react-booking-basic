from rest_framework import serializers
from accounts.models import MyUser
from accounts.serializers import MyUserSerializer
from spaces.models import Space
from spaces.models import Slot

class SlotUserSerializer(MyUserSerializer):
    class Meta(MyUserSerializer.Meta):
        fields = ['username']

class SpaceSerializer(serializers.ModelSerializer):
    pending_slots = serializers.ReadOnlyField()
    available_slots = serializers.ReadOnlyField()
    class Meta:
        model = Space
        fields = ["id","name","max_slots","filled_slots","pending_slots",'available_slots']


class SlotSerializer(serializers.ModelSerializer):
    user = SlotUserSerializer(read_only=True)
    class Meta:
        model = Slot
        fields = "__all__"


class NewSlotSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=MyUser.objects.all())
    class Meta:
        model = Slot
        fields = "__all__"



