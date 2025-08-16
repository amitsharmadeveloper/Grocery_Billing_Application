from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import User
import uuid
from django.utils import timezone
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    message = models.TextField()
    attachment = models.FileField(upload_to='attachments/', null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.email}"

class LoginRecord(models.Model):
    email = models.EmailField()
    login_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} @ {self.login_time}"

class Registration(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=128)  # You can use hashing here if needed
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email


class Product(models.Model):
    UNIT_CHOICES = [
        'g', 'kg', 'tonne', 'mg', 'quintal', 'ml', 'l', 'gallon', 'pint', 'piece', 'dozen', 'pack', 'box'
    ]

    quantity_validator = RegexValidator(
        regex=r'^\s*\d+(\.\d+)?\s*(g|kg|tonne|mg|quintal|ml|l|gallon|pint|piece|dozen|pack|box)\s*$',
        message="Enter quantity in a valid format (e.g., '500g', '1 kg', '2 dozen')."
    )

    id = models.CharField(
        max_length=50, 
        primary_key=True, 
        unique=True
    )
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='product_images/')
    
    quantity = models.CharField(
        max_length=20,
        validators=[quantity_validator]
    )

    price = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.PositiveIntegerField()

    #  tax field (in percentage, e.g., 5.00 for 5%)
    tax = models.DecimalField(
        max_digits=5,
        decimal_places=2
        
    )

    def __str__(self):
        return self.name

# models.py
class CartItem(models.Model):
    order_id = models.CharField(max_length=100, null=True, blank=True)  # ADD THIS
    customer_name = models.CharField(max_length=100, null=True, blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=200, null=True, blank=True)
    stock = models.PositiveIntegerField(default=0)
    price = models.FloatField(default=0.0)
    tax = models.FloatField(default=0.0)
    subtotal = models.FloatField(default=0.0)
    total = models.FloatField(default=0.0)
    created_at = models.DateTimeField(default=timezone.now)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    payment_method = models.CharField(max_length=50, blank=True, null=True)
    payment_due = models.BooleanField(default=False)
    due_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_done = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.customer_name} - {self.product_name}"

    




class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    product_name = models.CharField(max_length=200)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    tax_percent = models.DecimalField(max_digits=5, decimal_places=2)
    line_total = models.DecimalField(max_digits=10, decimal_places=2)  # (price * quantity) + tax
    grand_total = models.DecimalField(max_digits=12, decimal_places=2)  # full cart total
    payment_method = models.CharField(max_length=50)  # GPay / PhonePe / etc.
    payment_done = models.BooleanField(default=False)
    

    def __str__(self):
        return f"{self.product_name} x {self.quantity} by {self.customer.username if self.customer else 'Guest'}"
    
    
