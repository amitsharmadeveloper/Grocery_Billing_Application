from django import forms
from .models import Contact, Registration
from .models import Product



class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, label="Password")

    class Meta:
        model = Registration
        fields = ['name', 'email', 'phone', 'password']

class LoginForm(forms.Form):
    email = forms.EmailField(label="Email")
    password = forms.CharField(widget=forms.PasswordInput, label="Password")

class ContactForm(forms.ModelForm):
    attachment = forms.FileField(required=False)
    class Meta:
        model = Contact
        fields = ['name', 'email', 'phone', 'message','attachment']
        

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'quantity', 'price', 'stock', 'tax']        

