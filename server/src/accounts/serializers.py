from rest_framework import serializers
from accounts.models import MyUser
from django.contrib.auth.password_validation import CommonPasswordValidator

class MyUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,min_length=8,allow_blank=False)
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = MyUser
        fields = ['id','username','email','password','password2','is_staff']
    
    def validate(self, attrs):
        check_common = CommonPasswordValidator()
        try:
            check_common.validate(password=attrs['password'])
        except:
            raise serializers.ValidationError({'password':'Common password'})
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password2':'Passwords do not match'})
        return attrs
    
    def create(self, validated_data):
        user = MyUser.objects.create_user(email=validated_data['email'],password=validated_data['password'],username=validated_data['username'])
        return user