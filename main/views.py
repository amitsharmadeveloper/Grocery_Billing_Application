from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.utils.timezone import now
from .models import LoginRecord, Registration
from .forms import ContactForm  # Ensure your ContactForm uses forms.ModelForm or forms.Form
from .models import Product, CartItem
from django.views.decorators.csrf import csrf_exempt 
from django.shortcuts import redirect, get_object_or_404
from django.contrib import messages
from .templatetags.custom_tags import get_browser_qty
from .forms import ProductForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from decimal import Decimal
import os
from django.conf import settings
from django.http import FileResponse, JsonResponse
from django.utils import timezone
from django.template.loader import get_template
from xhtml2pdf import pisa
import io
import openpyxl
from PIL import Image
from .models import  Order
import json
import uuid
from django.http import HttpResponse
from django.template.loader import render_to_string
import imgkit
from django.utils.timezone import now
from django.db.models import Sum , F
from datetime import timedelta
import io
import xlsxwriter
import calendar
from django.utils.timezone import localtime
from django.utils.timezone import is_naive, make_aware
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from collections import defaultdict 
from django.core.mail import EmailMessage, send_mail
from django.core.files.uploadedfile import InMemoryUploadedFile
import mimetypes
from mimetypes import guess_type  
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet ,  ParagraphStyle
from datetime import datetime
from reportlab.lib.units import inch
def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def base(request):
    return render(request, 'admin_home.html')

def supplier_payment_view(request):
    return render(request, 'supplier_payment.html')

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST, request.FILES)
        if form.is_valid():
            contact = form.save()
            attachment = contact.attachment

            filename = os.path.basename(attachment.name) if attachment else None
            mime_type, _ = guess_type(filename) if filename else (None, None)

            # Email to admin
            email_to_admin = EmailMessage(
                subject='New Contact Form Message',
                body=f"Name: {contact.name}\nEmail: {contact.email}\nPhone: {contact.phone}\nMessage: {contact.message}",
                from_email='amityk45@gmail.com',
                to=['amityk45@gmail.com'],
            )
            if attachment:
                attachment.open()
                email_to_admin.attach(filename, attachment.read(), mime_type or 'application/octet-stream')
                attachment.close()
            email_to_admin.send()

            # Email to user
            email_to_user = EmailMessage(
                subject='Sent Your Bill ',
                body=f"Hi {contact.name},\n\nThanks for coming and shopping in our shop. Visit Again:\n\n\"{contact.message}\"\n\n- Grocery Shop",
                from_email='amityk45@gmail.com',
                to=[contact.email],
            )
            if attachment:
                attachment.open()
                email_to_user.attach(filename, attachment.read(), mime_type or 'application/octet-stream')
                attachment.close()
            email_to_user.send()

            # ✅ Redirect after post
            return redirect('/contact/?success=1')

    else:
        form = ContactForm()

    # Check for success parameter
    success = request.GET.get('success') == '1'
    
    # ✅ Render the form and success only once, then redirect to clean URL
    if success:
        response = render(request, 'contact.html', {'form': form, 'success': True})
        response['Refresh'] = '1; url=/contact/'  # clears the query param after 1 second
        return response

    return render(request, 'contact.html', {'form': form, 'success': False})


def user_login(request):
    error = None
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            user = Registration.objects.get(email=email)
            if user.password == password:  # Note: replace with password hashing in production
                LoginRecord.objects.create(email=email, login_time=now())
                # Optional: add session logic
                return redirect('home')
            else:
                error = "Invalid password"
        except Registration.DoesNotExist:
            error = "User with this email does not exist"
    return render(request, 'login.html', {'error': error})

def admin_user_login(request):  
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('admin_home')
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, 'admin_login.html')  # Optional: use a separate template


def register(request):
    error = None
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        password = request.POST.get('password')

        if Registration.objects.filter(email=email).exists():
            error = "Email already registered"
        else:
            Registration.objects.create(
                name=name,
                email=email,
                phone=phone,
                password=password  # Note: hash password before saving in production
            )
            return redirect('login')
    return render(request, 'register.html', {'error': error})



def search_view(request):
    query = request.GET.get('q')
    products = []

    if query:
        query = query.strip()  # Don't strip #, keep exact value

        # Try to find product by exact ID first
        try:
            product = Product.objects.get(id=query)
            products = [product]
        except Product.DoesNotExist:
            # If not found by ID, do case-insensitive name search
            products = Product.objects.filter(name__icontains=query)
            
    not_found = bool(query and not products)
    
    return render(request, 'search.html', {'products': products, 'not_found': not_found})







def add_to_cart(request, product_id):
    product = Product.objects.get(id=product_id)
    CartItem.objects.create(product=product)
    return redirect('cart')

def cart_page(request):
    cart_items = CartItem.objects.all()
    return render(request, 'cart.html', {'cart_items': cart_items})


@csrf_exempt
def image_search(request):
    if request.method == 'POST':
        image = request.FILES.get('image')
        if image:
            uploaded_filename = os.path.basename(image.name).lower()

            # Build the absolute path to media/product_images/filename
            image_folder = os.path.join(settings.MEDIA_ROOT, 'product_images')
            image_path = os.path.join(image_folder, uploaded_filename)

            # Check if image file exists in the folder
            if os.path.exists(image_path):
                # Find product with this image name
                matched_product = Product.objects.filter(image=f'product_images/{uploaded_filename}').first()
                if matched_product:
                    return render(request, 'search.html', {'products': [matched_product],'not_found': False})
                else:
                    return render(request, 'search.html', {'products': [], 'not_found': True})
            else:
                return render(request, 'search.html', {'products': [], 'not_found': True})

    return render(request, 'search.html', {'products': [],'not_found': False})


def add_to_cart(request, product_id):
    cart = request.session.get('cart', {})

    request.session["cart_confirmed"] = False

    # Update cart in session
    cart[product_id] = cart.get(product_id, 0) + 1
    request.session['cart'] = cart

    qty_key = f'browser_qty_{product_id}'
    request.session[qty_key] = cart[product_id]

    stock_key = f'original_stock_{product_id}'
    product = Product.objects.get(id=product_id)
    if stock_key not in request.session:
        request.session[stock_key] = product.stock

    #  Reduce stock in DB immediately
    if product.stock > 0:
        product.stock -= 1
        product.save()

    request.session.modified = True
    return redirect('search')

 


def cart_page(request):
    cart_confirmed = request.session.get("cart_confirmed", False)
    cart = request.session.get('cart', {}) if not cart_confirmed else {}
    cart_items = []
    total_price = Decimal('0.00')

    show_bill_buttons = request.session.get("show_bill_buttons", False)

    if cart:
        for product_id in cart:
            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                continue

            quantity = get_browser_qty(request.session, product.id)
            base_price = product.price * quantity
            tax_rate = Decimal(product.tax) if product.tax else Decimal('0.00')
            tax_amount = base_price * (tax_rate / Decimal('100'))
            item_total = base_price 

            cart_items.append({
                'product': product,
                'quantity': quantity,
                'item_total': item_total,
                'tax_amount': tax_amount,
            })
            total_price += item_total

    # ❌ Remove this deletion here
    # if "show_bill_buttons" in request.session:
    #     del request.session["show_bill_buttons"]

    # ✅ Instead, delete it *after* rendering (use a separate view if needed)

    payment_options = [
        "QR", "Google Pay", "Phone Pay", "Credit Card", "Debit Card",
        "Net Banking", "Cash"
    ]

    response = render(request, 'cart.html', {
        'cart_items': cart_items,
        'total_price': total_price,
        'show_bill_buttons': show_bill_buttons,
        'payment_options': payment_options
    })

    # ✅ Now remove the flag after rendering the page once
    if "show_bill_buttons" in request.session:
        del request.session["show_bill_buttons"]

    return response
 



#updating quantity
def update_quantity(request, item_id):
    product = get_object_or_404(Product, id=item_id)
    session_qty_key = f'browser_qty_{item_id}'
    session_max_key = f'original_stock_{item_id}'

    # Store the original stock only once
    if session_max_key not in request.session:
        request.session[session_max_key] = product.stock

    browser_qty = int(request.session.get(session_qty_key, 0))
    original_stock = request.session[session_max_key]
    action = request.POST.get("action")

    if request.method == "POST":
        if action == "increase":
            if browser_qty < original_stock and product.stock > 0:
                browser_qty += 1
                product.stock -= 1
                request.session[session_qty_key] = browser_qty
                product.save()
                messages.success(request, f"Added 1 more {product.name} to your cart.")
            elif browser_qty >= original_stock:
                messages.error(request, f"You are going out of available stock.")

        elif action == "decrease":
            if browser_qty > 0:
                browser_qty -= 1
                if product.stock < original_stock:
                    product.stock += 1
                    product.save()
                request.session[session_qty_key] = browser_qty
                messages.success(request, f"Removed 1 {product.name} from your cart.")
            else:
                messages.warning(request, f"Cannot reduce {product.name} quantity below 0.")

    return redirect('cart')

#remove from cart
def remove_from_cart(request, product_id):
    cart = request.session.get('cart', {})  # Get current cart from session

    if product_id in cart:
        del cart[product_id]  # Remove the product by ID (like '#100')
        request.session['cart'] = cart  # Save updated cart back to session
        messages.success(request, f"Product {product_id} removed from cart.")
    else:
        messages.error(request, f"Product {product_id} not found in cart.")

    return redirect('cart')  # Redirect back to the cart page


#adding product details through my web application
@login_required
def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Product added successfully!')
            return redirect('add_product')  # or wherever you want to go after adding
    else:
        form = ProductForm()
    return render(request, 'add_product.html', {'form': form})



#delete product and udate product directly
def manage_products(request):
    products = Product.objects.all()

    if request.method == 'POST':
        if 'delete_single' in request.POST:
            product_id = request.POST['delete_single']
            Product.objects.filter(id=product_id).delete()
            messages.success(request, "Product deleted successfully.")
            return redirect('manage_products')
    
        if 'delete' in request.POST:
            ids = request.POST.getlist('product_ids')
            Product.objects.filter(id__in=ids).delete()
            messages.success(request, "Selected product(s) deleted successfully.")
            return redirect('manage_products')

        if 'update' in request.POST:
            product_id = request.POST.get('product_id')
            product = get_object_or_404(Product, id=product_id)
            form = ProductForm(request.POST, request.FILES, instance=product)
            if form.is_valid():
                form.save()
                messages.success(request, "Product updated successfully.")
                return redirect('manage_products')

    selected_id = request.GET.get('select')
    selected_product = None
    if selected_id:
        selected_product = get_object_or_404(Product, id=selected_id)

    return render(request, 'manage_products.html', {
        'products': products,
        'selected_product': selected_product,
        'form': ProductForm(instance=selected_product) if selected_product else None,
    })
    
    
def update_product(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            return redirect('manage_products')
    else:
        form = ProductForm(instance=product)

    return render(request, 'update_product.html', {'form': form})    


# Helper to get cart data from session or DB
def get_cart_data(request):
    # Simulate cart data using all products with stock > 0
    products = Product.objects.filter(stock__gt=0)
    
    items = []
    total = 0

    for product in products:
        amount = float(product.price) * int(product.stock)
        tax_percent = float(product.tax)
        taxed_amount = amount * (1 + tax_percent / 100)

        items.append({
            "name": product.name,
            "qty": product.stock,  # treating stock as quantity here
            "price": float(product.price),
            "tax_percent": tax_percent,
            "amount": round(taxed_amount, 2)
        })

        total += round(taxed_amount, 2)

    return items, round(total, 2)



def save_order(request):
    if request.method == "POST":
        data = json.loads(request.body)
        customer_name = data.get("customer_name")

        # Update all CartItems with this customer name
        cart_items = CartItem.objects.filter(customer_name__isnull=True)  # or filter by session if needed
        for item in cart_items:
            item.customer_name = customer_name
            item.save()

        return JsonResponse({"status": "success"})

    return JsonResponse({"status": "error"})


#customer_name and many thing adding to database
def save_cart_to_db(request):
    if request.method == "POST":
        customer_name = request.POST.get("customer_name", "").strip()
        phone_number = request.POST.get("phone_number", "").strip()
        payment_method = request.POST.get("payment_method", "").strip()
        payment_due = request.POST.get("payment_due") == "yes"
        due_amount = request.POST.get("due_amount") or 0
        payment_done = request.POST.get("payment_done") == "on"

        if not customer_name:
            messages.error(request, "Customer name required.")
            return redirect("cart")

        cart = request.session.get("cart", {})
        if not cart:
            messages.error(request, "Cart is empty.")
            return redirect("cart")

        order_id = str(uuid.uuid4())
        request.session["last_order_id"] = order_id
        request.session["last_customer_name"] = customer_name

        for product_id_str in cart:
            try:
                quantity = int(request.session.get(f'browser_qty_{product_id_str}', 0))
                if quantity <= 0:
                    continue

                product = Product.objects.get(id=product_id_str)
                price = product.price
                tax = product.tax
                subtotal = price * quantity
                total = subtotal 

                CartItem.objects.create(
                    id=str(uuid.uuid4()),
                    order_id=order_id,
                    customer_name=customer_name,
                    phone_number=phone_number,
                    payment_method=payment_method,
                    payment_due=payment_due,
                    due_amount=due_amount,
                    payment_done=payment_done,
                    product=product,
                    product_name=product.name,
                    price=price,
                    tax=tax,
                    stock=quantity,
                    subtotal=subtotal,
                    total=total
                )
            except Exception as e:
                print(f"[ERROR] {e}")
                continue

        # Clear session cart
        request.session["cart"] = {}
        for key in list(request.session.keys()):
            if key.startswith("browser_qty_") or key.startswith("original_stock_"):
                del request.session[key]

        # ✅ Set these flags
        request.session["show_bill_buttons"] = True
        request.session["cart_confirmed"] = True  # 🔥 MISSING LINE

        request.session.modified = True
        return redirect("cart")

    return redirect("cart")



@csrf_exempt
def update_cartitem_quantity(request, cartitem_id):
    if request.method == "POST":
        action = request.POST.get("action")
        cart = request.session.get("cart", {})
        current_qty = cart.get(cartitem_id, 0)

        if action == "increase":
            current_qty += 1
        elif action == "decrease" and current_qty > 0:
            current_qty -= 1

        cart[cartitem_id] = current_qty
        request.session["cart"] = cart
        request.session[f'browser_qty_{cartitem_id}'] = current_qty  # Save per item quantity
        request.session.modified = True

        return redirect("cart")


def generate_bill(request, format):
    order_id = request.session.get("last_order_id")
    customer_name = request.session.get("last_customer_name", "Customer").strip()

    if not order_id:
        return HttpResponse("No order found.")

    items = CartItem.objects.filter(order_id=order_id)
    if not items.exists():
        return HttpResponse("No items found in this order.")

    subtotal = Decimal('0.00')
    grand_total = Decimal('0.00')
    igst_breakdown = {}

    item_data = []
    for item in items:
        item_subtotal = Decimal(item.subtotal)
        item_total = Decimal(item.total)
        tax_rate = Decimal(str(item.tax)).quantize(Decimal("0.01"))

        subtotal += item_subtotal
        grand_total += item_total

        tax_amount = (Decimal(item.price) * item.stock) * tax_rate / 100
        igst_breakdown[tax_rate] = igst_breakdown.get(tax_rate, Decimal('0.00')) + tax_amount

        item_data.append({
            "product_name": item.product_name,
            "stock": item.stock,
            "price": item.price,
            "subtotal": item_subtotal,
            "tax": tax_rate,
            "total": item_total
        })

    igst_list = [{"rate": rate, "amount": amount} for rate, amount in sorted(igst_breakdown.items())]

    context = {
        "items": item_data,
        "customer_name": customer_name,
        "date": now().strftime("%d-%b-%Y"),
        "time": now().strftime("%I:%M %p"),
        "bill_no": f"IN-{order_id[-4:]}",
        "subtotal": subtotal,
        "igst_list": igst_list,
        "grand_total": grand_total
    }

    if format == "pdf":
        html = render_to_string("bill_pdf_template.html", context)
        result = io.BytesIO()
        pisa_status = pisa.CreatePDF(
            html.encode("utf-8"), 
            dest=result, 
            encoding='utf-8'
        )

        if pisa_status.err:
            return HttpResponse("Error generating PDF")
        result.seek(0)
        return FileResponse(result, as_attachment=True, filename=f"{customer_name}.pdf")

    elif format == "image":
        html = render_to_string("bill_pdf_template.html", context)
        config = imgkit.config(wkhtmltoimage=os.path.join("C:\\Program Files\\wkhtmltopdf\\bin", "wkhtmltoimage.exe"))
        options = {"format": "jpeg", "encoding": "UTF-8"}

        try:
            image_data = imgkit.from_string(html, False, config=config, options=options)
            response = HttpResponse(image_data, content_type="image/jpeg")
            response['Content-Disposition'] = f'attachment; filename="{customer_name}.jpg"'
            return response
        except Exception as e:
            return HttpResponse(f"Error generating image: {e}")

    return HttpResponse("Invalid format")

#order history 
def download_order_bill(request, format, order_id):
    items = CartItem.objects.filter(order_id=order_id)
    if not items.exists():
        return HttpResponse("No items found in this order.")

    customer_name = items.first().customer_name or "Customer"
    subtotal = Decimal('0.00')
    grand_total = Decimal('0.00')
    igst_breakdown = {}

    item_data = []
    for item in items:
        item_subtotal = Decimal(item.subtotal)
        item_total = Decimal(item.total)
        tax_rate = Decimal(str(item.tax)).quantize(Decimal("0.01"))

        subtotal += item_subtotal
        grand_total += item_total

        tax_amount = (Decimal(item.price) * item.stock) * tax_rate / 100
        igst_breakdown[tax_rate] = igst_breakdown.get(tax_rate, Decimal('0.00')) + tax_amount

        item_data.append({
            "product_name": item.product_name,
            "stock": item.stock,
            "price": item.price,
            "subtotal": item_subtotal,
            "tax": tax_rate,
            "total": item_total
        })

    igst_list = [{"rate": rate, "amount": amount} for rate, amount in sorted(igst_breakdown.items())]

    context = {
        "items": item_data,
        "customer_name": customer_name,
        "date": now().strftime("%d-%b-%Y"),
        "time": now().strftime("%I:%M %p"),
        "bill_no": f"IN-{order_id[-4:]}",
        "subtotal": subtotal,
        "igst_list": igst_list,
        "grand_total": grand_total
    }

    if format == "pdf":
        html = render_to_string("bill_pdf_template.html", context)
        result = io.BytesIO()
        pisa_status = pisa.CreatePDF(html.encode("utf-8"), dest=result, encoding='utf-8')
        if pisa_status.err:
            return HttpResponse("Error generating PDF")
        result.seek(0)
        return FileResponse(result, as_attachment=True, filename=f"{customer_name}.pdf")

    elif format == "image":
        html = render_to_string("bill_pdf_template.html", context)
        config = imgkit.config(wkhtmltoimage=os.path.join("C:\\Program Files\\wkhtmltopdf\\bin", "wkhtmltoimage.exe"))
        options = {"format": "jpeg", "encoding": "UTF-8"}
        try:
            image_data = imgkit.from_string(html, False, config=config, options=options)
            response = HttpResponse(image_data, content_type="image/jpeg")
            response['Content-Disposition'] = f'attachment; filename="{customer_name}.jpg"'
            return response
        except Exception as e:
            return HttpResponse(f"Error generating image: {e}")

    return HttpResponse("Invalid format")



def order_history_view(request):
    orders = CartItem.objects.all().order_by('-created_at')  # if you have created_at in CartItem

    for order in orders:
        # Optional - generate summary string
        order.item_summary = f"{order.product_name} x{order.stock} at ₹{order.price} each"
        order.igst = (Decimal(order.price) * Decimal(order.stock)) * Decimal(order.tax) / Decimal(100)
        order.subtotal = Decimal(order.subtotal)
        order.total = Decimal(order.total)
        due_amount = Decimal(getattr(order, 'due_amount', 0) or 0)

        # Now subtraction works
        order.paid_amount = order.total - due_amount

    return render(request, "order_history.html", {"orders": orders})

#sales report
def group_data(items, group_by):
    revenue = {}
    for item in items:
        dt = item.created_at
        if is_naive(dt):
            dt = make_aware(dt)
        dt = localtime(dt)

        if group_by == "day":
            label = dt.strftime("%d-%b-%Y")
        elif group_by == "week":
            label = f"Week {dt.isocalendar()[1]} ({dt.year})"
        elif group_by == "month":
            label = dt.strftime("%b-%Y")
        elif group_by == "quarter":
            quarter = (dt.month - 1) // 3 + 1
            label = f"Q{quarter}-{dt.year}"
        elif group_by == "year":
            label = str(dt.year)
        else:
            label = dt.strftime("%d-%b-%Y")

        revenue[label] = revenue.get(label, 0) + float(item.total)

    return revenue


def sales_report(request):
    start = request.GET.get('start')
    end = request.GET.get('end')
    group_by = request.GET.get('group_by', 'day')

    filtered = False
    items = []
    total_orders = 0
    total_revenue = 0
    top_selling_product = "N/A"
    least_selling_product = "N/A"
    product_sales = {}
    revenue_grouped = {}

    if start and end:
        filtered = True
        items = CartItem.objects.filter(created_at__date__range=[start, end])
        total_orders = items.values('order_id').distinct().count()
        total_revenue = items.aggregate(Sum('total'))['total__sum'] or 0

        for item in items:
            pname = item.product_name
            product_sales[pname] = product_sales.get(pname, 0) + item.stock

        if product_sales:
            top_selling_product = max(product_sales.items(), key=lambda x: x[1])[0]
            least_selling_product = min(product_sales.items(), key=lambda x: x[1])[0]

        revenue_grouped = group_data(items, group_by)

    context = {
        'filtered': filtered,
        'items': items,
        'start': start,
        'end': end,
        'group_by': group_by,
        'total_orders': total_orders,
        'total_revenue': total_revenue,
        'top_selling_product': top_selling_product,
        'least_selling_product': least_selling_product,
        'chart_labels': list(product_sales.keys()),
        'chart_values': list(product_sales.values()),
        'revenue_labels': list(revenue_grouped.keys()),
        'revenue_values': list(revenue_grouped.values()),
        'today': now().strftime("%d-%b-%Y"),
    }

    return render(request, 'sales_report.html', context)


def download_sales_report(request, format):
    start_date = request.GET.get("start")
    end_date = request.GET.get("end")
    group_by = request.GET.get("group_by", "day")

    if not start_date or not end_date:
        return HttpResponse("Start and end date required.")

    items = CartItem.objects.filter(created_at__date__range=[start_date, end_date])
    if not items.exists():
        return HttpResponse("No items found in this sales report.")

    total_sales = items.aggregate(Sum('total'))['total__sum'] or 0
    total_orders = items.values('order_id').distinct().count()

    product_sales = {}
    for item in items:
        pname = item.product_name
        product_sales[pname] = product_sales.get(pname, 0) + item.stock

    top_selling_product = max(product_sales.items(), key=lambda x: x[1])[0] if product_sales else "N/A"
    least_selling_product = min(product_sales.items(), key=lambda x: x[1])[0] if product_sales else "N/A"
    grouped_revenue = group_data(items, group_by)

    # 🔴 Chart with 2 stacked subplots
    chart_image = None
    if product_sales or grouped_revenue:
        fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8))

        # Product-wise chart
        product_names = list(product_sales.keys())
        quantities = list(product_sales.values())
        ax1.bar(product_names, quantities, color='red', edgecolor='black')
        ax1.set_title("Product-wise Sales Quantity", fontsize=14, color='white')
        ax1.set_facecolor('#111')
        ax1.tick_params(axis='x', colors='white', labelsize=12)
        ax1.tick_params(axis='y', colors='white')
        ax1.set_xticklabels(product_names, fontsize=13, fontweight='bold', color='white')
        ax1.spines['bottom'].set_color('red')
        ax1.spines['left'].set_color('red')

        # Revenue comparison chart
        rev_labels = list(grouped_revenue.keys())
        rev_values = list(grouped_revenue.values())
        ax2.bar(rev_labels, rev_values, color='red', edgecolor='black')
        ax2.set_title(f"Revenue Comparison ({group_by.title()})", fontsize=14, color='white')
        ax2.set_facecolor('#111')
        ax2.tick_params(axis='x', colors='white', rotation=45, labelsize=10)
        ax2.tick_params(axis='y', colors='white')
        ax2.set_xticklabels(rev_labels, fontsize=10, color='white', fontweight='bold')
        ax2.spines['bottom'].set_color('red')
        ax2.spines['left'].set_color('red')

        fig.patch.set_facecolor('#111')
        plt.tight_layout()

        buffer = BytesIO()
        plt.savefig(buffer, format='png', dpi=150)
        buffer.seek(0)
        image_png = buffer.getvalue()
        buffer.close()

        chart_image = base64.b64encode(image_png).decode('utf-8')
        chart_image = f'data:image/png;base64,{chart_image}'
        plt.close()

    #  Prepare data rows
    data = []
    for item in items:
        dt = item.created_at
        if is_naive(dt):
            dt = make_aware(dt)
        dt = localtime(dt)
        short_id = f"ORD-{item.order_id[-4:]}" if item.order_id else "N/A"
        data.append({
            "order_id": short_id,
            "customer": item.customer_name,
            "product": item.product_name,
            "qty": item.stock,
            "price": item.price,
            "subtotal": item.subtotal,
            "payment_method": item.payment_method,
            "total": item.total,
            "date": dt.strftime("%d-%b-%Y"),

        })

    #  Template context
    context = {
        "data": data,
        "start": start_date,
        "end": end_date,
        "total_sales": total_sales,
        "total_orders": total_orders,
        "total_revenue": total_sales,
        "today": now().strftime("%d-%b-%Y"),
        "top_selling_product": top_selling_product,
        "least_selling_product": least_selling_product,
        "chart_image": chart_image,
        "group_by": group_by,
    }

    html = render_to_string("sales_report_template.html", context)

    if format == "pdf":
        result = BytesIO()
        pisa_status = pisa.CreatePDF(html.encode("utf-8"), dest=result)
        if pisa_status.err:
            return HttpResponse("Error generating PDF")
        result.seek(0)
        return FileResponse(result, as_attachment=True, filename=f"Sales_Report_{start_date}_to_{end_date}.pdf")

    elif format == "image":
        config = imgkit.config(wkhtmltoimage=os.path.join("C:\\Program Files\\wkhtmltopdf\\bin", "wkhtmltoimage.exe"))
        try:
            img_data = imgkit.from_string(html, False, config=config)
            response = HttpResponse(img_data, content_type="image/jpeg")
            response['Content-Disposition'] = f'attachment; filename="Sales_Report_{start_date}_to_{end_date}.jpg"'
            return response
        except Exception as e:
            return HttpResponse(f"Error generating image: {e}")

    return HttpResponse("Invalid format.") 


def send_supplier_bill(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            supplier_email = data.get("supplier_email")
            bill_details = data.get("bill_details_data")

            if not supplier_email or not bill_details:
                return JsonResponse({"status": "error", "message": "Missing supplier email or bill details"}, status=400)

            # Shop details (FROM)
            shop_info = {
                "name": "Hari OM BAZAR",
                "address": "Om complex, Old Jewargi Rd, biddapur Colony, Kalaburagi, Karnataka , India",
                "contact": "7411171397",
                "gstin": "29ABCDE1234F2Z5"
            }

            # Supplier details (TO)
            supplier_info = {
                "name": bill_details["supplier_name"],
                "address": bill_details["address"],
                "contact": bill_details["contact"],
                "gstin": bill_details["gstin_number"]
            }

            # File path
            file_name = f"Supplier_Bill_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
            os.makedirs("media", exist_ok=True)
            file_path = os.path.join("media", file_name)

            # Create PDF
            doc = SimpleDocTemplate(file_path, pagesize=A4, rightMargin=30, leftMargin=30, topMargin=20, bottomMargin=20)
            styles = getSampleStyleSheet()
            elements = []

            # Header
            elements.append(Paragraph(f"<b>{shop_info['name']}</b>", ParagraphStyle('header', fontSize=18, alignment=1)))
            elements.append(Spacer(1, 60))

            # From section 
            elements.append(Paragraph("<b>From:</b>", styles["Normal"]))
            elements.append(Paragraph(f"Shop_name: {shop_info['name']}", styles["Normal"]))
            elements.append(Paragraph(f"Address: {shop_info['address']}", styles["Normal"]))
            elements.append(Paragraph(f"Contact: {shop_info['contact']}", styles["Normal"]))
            elements.append(Paragraph(f"GSTIN: {shop_info['gstin']}", styles["Normal"]))
            elements.append(Spacer(1, 20))

            # To section 
            elements.append(Paragraph("<b>To:</b>", styles["Normal"]))
            elements.append(Paragraph(f"Supplier_name: {supplier_info['name']}", styles["Normal"]))
            elements.append(Paragraph(f"Address: {supplier_info['address']}", styles["Normal"]))
            elements.append(Paragraph(f"Contact: {supplier_info['contact']}", styles["Normal"]))
            elements.append(Paragraph(f"GSTIN: {supplier_info['gstin']}", styles["Normal"]))
            elements.append(Spacer(1, 40))

            # Product Details 
            product_kv = [
                ["Product Name", bill_details["product_name"]],
                ["GST Tax (%)", bill_details["gst_tax"]],
                ["Product Price", bill_details["product_price"]],
                ["Product Stock", bill_details["product_stock"]],
                ["Discount", bill_details["discount"]],
                ["Amount", bill_details["amount"]],
                ["Payment Due", bill_details["payment_due"]],
                ["Due Amount", bill_details["due_amount"]],
                ["Paid Total", bill_details["paid_total"]],
                ["Payment Mode", bill_details["payment_mode"]],
                ["Date & Time", bill_details["date_time"]],
            ]

            prod_table = Table(product_kv, colWidths=[150, 370])
            prod_table.setStyle(TableStyle([
                ('BOX', (0, 0), (-1, -1), 0.5, colors.black),
                ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.black),
                ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 10),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ]))
            elements.append(prod_table)
            elements.append(Spacer(1, 70))

            # Footer
            elements.append(Paragraph("<b>Thank you for your business!</b>", ParagraphStyle('footer', alignment=1)))
            elements.append(Paragraph(f"Generated on: {datetime.now().strftime('%d-%m-%Y %H:%M:%S')}",
                                      ParagraphStyle('footer', alignment=1, fontSize=8)))

            # Build PDF
            doc.build(elements)

            # Send email
            email = EmailMessage(
                subject="Your Supplied Bill",
                body="Please find the attached your supplier bill as PDF.",
                from_email="amityk45@gmail.com",
                to=[supplier_email]
            )
            email.attach_file(file_path)
            email.send()

            return JsonResponse({
                "status": "success",
                "message": "Professional bill created, emailed, and saved successfully!",
                "file_url": f"/media/{file_name}"
            })

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "error", "message": "Only POST allowed"}, status=405)



@csrf_exempt
def update_order_amount(request):
    if request.method == "POST":
        import json
        data = json.loads(request.body)
        
        order_id = data.get("Order ID")  # Make sure key matches your updatedData
        paid = Decimal(data.get("Paid", "0").replace("₹", "").strip())
        due = Decimal(data.get("Payment Due", "0").replace("₹", "").strip())

        try:
            order = CartItem.objects.get(order_id=order_id)
            order.paid_amount = paid
            order.due_amount = due
            order.save()
            return JsonResponse({"success": True})
        except CartItem.DoesNotExist:
            return JsonResponse({"success": False, "error": "Order not found"}, status=404)