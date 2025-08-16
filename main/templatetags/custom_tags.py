from django import template

register = template.Library()

@register.filter
def get_browser_qty(session, product_id):
    return session.get(f'browser_qty_{product_id}', 0)
