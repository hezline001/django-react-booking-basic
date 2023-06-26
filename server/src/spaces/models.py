from typing import Iterable, Optional
from django.db import models
from django.core.validators import MaxValueValidator
# Create your models here.


class Space(models.Model):
    name = models.CharField(max_length = 30,unique = True)
    max_slots = models.BigIntegerField(null=False,blank=False,validators=[MaxValueValidator(50)])
    filled_slots = models.PositiveSmallIntegerField(default = 0)

    @property
    def available_slots(self):
        return self.max_slots-self.filled_slots-self.pending_slots

    def __str__(self) -> str:
        return self.name
    
    @property
    def pending_slots(self):
        return self.slots.filter(status='pending').count()


class Slot(models.Model):
    status_choices = [
        ('empty','empty'),
        ('pending','pending'),
        ('booked','booked'),
    ]
    slot_id = models.PositiveIntegerField()
    space = models.ForeignKey(Space,on_delete=models.CASCADE,related_name='slots',null=False,)
    company_name = models.CharField(max_length=30,null=False,blank=False)
    user = models.ForeignKey("accounts.MyUser",null=False,blank=False,related_name='slots',on_delete=models.CASCADE,related_query_name='slot')
    status = models.CharField(choices=status_choices,default='empty')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['slot_id','space'],name='unique_slotid_space')
        ]
        ordering = ['slot_id']
    def __str__(self) -> str:
        return self.company_name
    
