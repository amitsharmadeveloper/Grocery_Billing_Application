# urls.py placeholder
from django.contrib import admin 
from django.urls import path 
from main import views
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse
from django.contrib.auth.views import LogoutView
from main.views import generate_bill

def well_known_handler(request):
    return HttpResponse("", status=204)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.user_login, name='default-login'),  
    path('home/', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('login/', views.user_login, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', LogoutView.as_view(next_page='home'), name='logout'),
    path('search/', views.search_view, name='search'),
    path('cart/', views.cart_page, name='cart'),
    path('admin_home/', views.base, name='admin_home'),
    path('add-to-cart/<str:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('update-quantity/<str:item_id>/', views.update_quantity, name='update_quantity'),
    path('remove/<str:product_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('admin-login/', views.admin_user_login, name='admin_login'),
    path('manage-products/', views.manage_products, name='manage_products'),
    path('update-product/<str:product_id>/', views.update_product, name='update_product'),
    path('add-product/', views.add_product, name='add_product'),
    path("generate-bill/<str:format>/", views.generate_bill, name="generate_bill"),
    path('image-search/', views.image_search, name='image_search'),
    path('order_history/', views.order_history_view, name='order_history'),
    path("save-cart-to-db/", views.save_cart_to_db, name="save_cart_to_db"),
    path('update-cartitem/<str:cartitem_id>/', views.update_cartitem_quantity, name='update_cartitem_quantity'),
    path('generate-bill/<str:format>/<str:order_id>/', views.generate_bill, name='generate_bill_with_id'),
    path('download/<str:format>/<str:order_id>/', views.download_order_bill, name='download_order_bill'),
    path('sales_report/', views.sales_report, name='sales_report'),
    path("download_sales_report/<str:format>/", views.download_sales_report, name="download_sales_report"),
    path('supplier-payment/', views.supplier_payment_view, name='supplier_payment'),
    path('send-supplier-bill/', views.send_supplier_bill, name='send_supplier_bill'),
    path("update_order/", views.update_order_amount, name="update_order_amount"),
    path('.well-known/appspecific/com.chrome.devtools.json', well_known_handler)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)