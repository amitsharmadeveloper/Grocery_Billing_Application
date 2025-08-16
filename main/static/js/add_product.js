document.addEventListener('DOMContentLoaded', function () {
    const productData = {
'kissan tomato ketchup 500g': { tax: 12, quantity: "500g", price: 160 },
'kissan no onion no garlic ketchup 200g': { tax: 12, quantity: "200g", price: 125 },
'maggi rich tomato ketchup 500g':{ tax: 12, quantity: "500g", price: 155 },
'maggi hot & sweet tomato chilli sauce 400g': { tax: 12, quantity: "400g", price: 155 },
'heinz tomato ketchup 400g': { tax: 12, quantity: "400g", price: 63 },
'del monte tomato ketchup 950g': { tax: 12, quantity: "950g", price: 85 },
'veeba tomato ketchup 350g': { tax: 12, quantity: "350g", price: 98 },
'tops tomato ketchup 500g': { tax: 12, quantity: "500g", price: 120 },
'american garden tomato ketchup 794g': { tax: 12, quantity: "794g", price: 230 },
'naturin tomato ketchup 1kg': { tax: 12, quantity: "1kg", price: 239 },
'funfoods classic tomato ketchup 850g': { tax: 12, quantity: "850g", price: 99 },
'organic tattva tomato ketchup 500g': { tax: 12, quantity: "500g", price: 150 },
'wingreens farm tomato ketchup 200g': { tax: 12, quantity: "200g", price: 120 },
'hellmann’s tomato ketchup 360g': { tax: 12, quantity: "360g", price: 180 },
'fortune tomato ketchup 200g': { tax: 12, quantity: "200g", price: 70 },
// Soya Sauce – 12%
'ching’s dark soya sauce 200ml': { tax: 12, quantity: "200ml", price:60 },
'ching’s soy sauce 90ml pouch': { tax: 12, quantity: "90ml", price: 18 },
'kikkoman naturally brewed soy sauce 250ml': { tax: 12, quantity: "250ml", price: 270 },
'kikkoman less salt soy sauce 250ml': { tax: 12, quantity: "250ml", price: 849 },
'blue dragon light soy sauce 150ml': { tax: 12, quantity: "150ml", price: 100 },
'blue dragon dark soy sauce 250ml': { tax: 12, quantity: "250ml", price: 95 },
'knorr soya sauce 200ml': { tax: 12, quantity: "200ml", price: 60 },
'del monte soy sauce 250ml': { tax: 12, quantity: "250ml", price: 230 },
'fortune soy sauce 100ml': { tax: 12, quantity: "100ml", price: null },
'veeba soy sauce 300g': { tax: 12, quantity: "300g", price: null },
'tops soya sauce 200g': { tax: 12, quantity: "200g", price: null },
'american garden soy sauce 400ml': { tax: 12, quantity: "400ml", price: null },
'smith & jones soy sauce 200g': { tax: 12, quantity: "200g", price: null },
'urban platter gluten free soy sauce 250ml': { tax: 12, quantity: "250ml", price: null },
'naturin soya sauce 200ml': { tax: 12, quantity: "200ml", price: null },
// Red Chilli Sauce – 12%
'ching’s red chilli sauce 190g': { tax: 12, quantity: "190g", price: 55 },
'ching’s red chilli sauce 680g': { tax: 12, quantity: "680g", price: 55 },
'veeba red chilli sauce 300g': { tax: 12, quantity: "300g", price: 55 },
'del monte red chilli sauce 200g': { tax: 12, quantity: "200g", price: 55 },
'tops red chilli sauce 250g': { tax: 12, quantity: "250g", price: 55 },
'american garden red chilli sauce 400g': { tax: 12, quantity: "400g", price: 55 },
'wingreens red chilli garlic sauce 200g': { tax: 12, quantity: "200g", price: 55 },
'smith & jones red chilli sauce 200g': { tax: 12, quantity: "200g", price: 55 },
'naturin red chilli sauce 500g': { tax: 12, quantity: "500g", price: 55 },
'funfoods hot red chilli sauce 240g': { tax: 12, quantity: "240g", price: 55 },
'fortune red chilli sauce 250g': { tax: 12, quantity: "250g", price: 55 },
'urban platter red chilli sauce 300g': { tax: 12, quantity: "300g", price: 55 },
'hellmann’s red chilli sauce 400g': { tax: 12, quantity: "400g", price: 55 },
// Green Chilli Sauce – 12%
'ching’s green chilli sauce 190g': { tax: 12, quantity: "190g", price:60 },
'ching’s green chilli sauce 680g': { tax: 12, quantity: "680g", price: 180 },
'veeba green chilli sauce 300g': { tax: 12, quantity: "300g", price: 60 },

// Mayonnaise – 18%
'funfoods veg mayonnaise 250g': { tax: 18, quantity: "250g", price: 100 },
'funfoods egg mayonnaise 250g': { tax: 18, quantity: "250g", price: 110 },
'funfoods garlic mayonnaise 250g':{ tax: 18, quantity: "250g", price: 100 },
'veeba classic mayonnaise 250g': { tax: 18, quantity: "250g", price: 109 },
'veeba eggless mayonnaise 300g': { tax: 18, quantity: "300g", price: 110 },
'veeba peri peri mayo 250g': { tax: 18, quantity: "250g", price: 110 },
'del monte eggless mayonnaise 275g':{ tax: 18, quantity: "275g", price: 48 },
'hellmann’s real mayonnaise 400g': { tax: 18, quantity: "400g", price: 95 },
// Pasta – 18%
'weikfield pasta penne 400g': { tax: 18, quantity: "400g", price: 113 },
'weikfield pasta fusilli 400g': { tax: 18, quantity: "400g", price: 150 },
'weikfield pasta elbows 400g': { tax: 18, quantity: "400g", price: 150 },
'weikfield macaroni 400g': { tax: 18, quantity: "400g", price: 150 },
'barilla penne pasta 500g': { tax: 18, quantity: "500g", price: 329 },
'barilla fusilli pasta 500g': { tax: 18, quantity: "500g", price: 329 },
'barilla spaghetti no.5 500g': { tax: 18, quantity: "500g", price: 296 },

'chef’s basket whole wheat pasta 250g':{ tax: 18, quantity: "250g", price: 115.0 },
'chef’s basket spaghetti 250g': { tax: 18, quantity: "250g", price: 115.0 },
'organic tattva penne pasta 250g': { tax: 18, quantity: "250g", price: null },
'organic tattva whole wheat pasta 250g': { tax: 18, quantity: "250g", price: null },
'urban platter penne pasta 500g': { tax: 18, quantity: "500g", price: null},
'fortune durum wheat pasta penne 500g': { tax: 18, quantity: "500g", price: null },
// Yippee Pasta – 18%
'yippee tricolor pasta treat 65g': { tax: 18, quantity: "65g", price: 35 },
'yippee saucy masala pasta 65g': { tax: 18, quantity: "65g", price: 35 },
'yippee pasta treat tomato cheese 65g': { tax: 18, quantity: "65g", price: 35 },
'yippee pasta treat cheese 65g': { tax: 18, quantity: "65g", price: 30 },
'yippee masala pasta treat 65g': { tax: 18, quantity: "65g", price: 35 },
'yippee pasta 4-in-1 pack 260g': { tax: 18, quantity: "260g", price: 140 },
// Maggi Noodles – 18%
'maggi masala noodles 70g': { tax: 18, quantity: "70g", price: 10 },
'maggi masala noodles 280g (4-pack)': { tax: 18, quantity: "280g", price: 48 },
'maggi 2-minute masala noodles 560g (8-pack)': { tax: 18, quantity: "560g", price: 96 },
'maggi chicken noodles 70g': { tax: 18, quantity: "70g", price: 12 },
'maggi veg atta noodles 80g': { tax: 18, quantity: "80g", price: 15 },
'maggi oats noodles 75g': { tax: 18, quantity: "75g", price: 15 },
'maggi special masala noodles 72g': { tax: 18, quantity: "72g", price: 15 },
'maggi pazzta cheesy tomato 64g': { tax: 18, quantity: "64g", price: 35 },
'maggi pazzta masala penne 64g': { tax: 18, quantity: "64g", price: 35 },
'maggi pazzta mushroom penne 64g': { tax: 18, quantity: "64g", price: 35 },
'maggi pazzta cheese macaroni 64g': { tax: 18, quantity: "64g", price: 35 },
'maggi cup noodles veg 70g': { tax: 18, quantity: "70g", price: 50 },
'maggi cup noodles chicken 70g': { tax: 18, quantity: "70g", price: 50 },
'maggi fusion hot & sweet noodles 70g': { tax: 18, quantity: "70g", price: 15 },
'maggi fusion schezwan noodles 70g': { tax: 18, quantity: "70g", price: 15 },
'maggi fusion spicy garlic noodles 70g': { tax: 18, quantity: "70g", price: 15 },
// Haldiram’s Fried Snacks – 12%
'haldiram’s aloo bhujia 200g': { tax: 12, quantity: "200g", price: 60 },
'haldiram’s moong dal 200g': { tax: 12, quantity: "200g", price: 60 },
'haldiram’s navratan mixture 400g': { tax: 12, quantity: "400g", price: 120 },
'haldiram’s masala peanuts 200g': { tax: 12, quantity: "200g", price: 60 },
'haldiram’s khatta meetha 400g': { tax: 12, quantity: "400g", price: 120 },
'haldiram’s chana chor garam 200g': { tax: 12, quantity: "200g", price: 60 },
'haldiram’s sev bhujia 400g': { tax: 12, quantity: "400g", price: 120 },
// Bikaji – 12%
'bikaji bhujia 400g':{ tax: 12, quantity: "400g", price: 215 },
'bikaji aloo lachha 200g': { tax: 12, quantity: "200g", price: 110 },
'bikaji moong dal 200g': { tax: 12, quantity: "200g", price: 110 },
'bikaji khatta meetha 400g': { tax: 12, quantity: "400g", price: 215 },
'bikaji chana dal 200g': { tax: 12, quantity: "200g", price: 110 },
'bikaji navratan mix 400g': { tax: 12, quantity: "400g", price: 125 },
// Balaji – 12%
'balaji sev bhujia 200g': { tax: 12, quantity: "200g", price: 55 },
'balaji aloo bhujia 200g': { tax: 12, quantity: "200g", price: 55 },
'balaji khatta meetha mixture 400g': { tax: 12, quantity: "400g", price: 55 },
// Bikanervala – 12%
'bikanervala classic namkeen mix 400g': { tax: 12, quantity: "400g", price: 55 },
'bikanervala dal moth 200g': { tax: 12, quantity: "200g", price: 55 },
'bikanervala aloo bhujia 200g': { tax: 12, quantity: "200g", price: 55 },
// Local/Other Brands – 12%
'lehar aloo bhujia 200g': { tax: 12, quantity: "200g", price: 55 },
'halke fulke masala rings 200g': { tax: 12, quantity: "200g", price: 55 },
'kuchh bhi chana dal namkeen 200g': { tax: 12, quantity: "200g", price: 55 },
'raju sev mixture 250g': { tax: 12, quantity: "250g", price: 55 },
// McCain – 5%
'mccain french fries 420g': { tax: 5.0, quantity: "420g", price: 200 },
'mccain smileys 400g': { tax: 5.0, quantity: "400g", price: 190 },
'mccain chilli garlic potato bites 400g': { tax: 5.0, quantity: "400g", price: 190 },
'mccain veggie nuggets 400g': { tax: 5.0, quantity: "400g", price: 170 },
'mccain potato cheese shotz 400g': { tax: 5.0, quantity: "400g", price: 200 },
'mccain masala fries 420g': { tax: 5.0, quantity: "420g", price: 200 },
'mccain aloo tikki 400g': { tax: 5.0, quantity: "400g", price: 180 },
// ITC Master Chef (Veg) – 5%
'itc master chef crispy french fries 400g': { tax: 5.0, quantity: "400g", price: 180 },
'itc master chef cheese corn nuggets 400g': { tax: 5.0, quantity: "400g", price: 190 },
'itc master chef veg sticks 400g': { tax: 5.0, quantity: "400g", price: 180 },
'itc master chef potato cheese bites 400g': { tax: 5.0, quantity: "400g", price: 190 },
// Other Brands – 5%
'godrej yummiez aloo tikki 400g': { tax: 5.0, quantity: "400g", price: 160 },
'fresho frozen veggie mix balls 400g': { tax: 5.0, quantity: "400g", price: 180 },
'meatzza veg cheese nuggets 400g': { tax: 5.0, quantity: "400g", price: 200 },
'safal frozen veg cutlet 400g': { tax: 5.0, quantity: "400g", price: 160 },
// MTR Masala Packets – 18%
'mtr puliyogare paste 200g': { tax: 18, quantity: "200g", price: 98 },
'mtr bisi bele bath masala 100g': { tax: 18, quantity: "100g", price:78 },
'mtr sambhar masala 100g': { tax: 18, quantity: "100g", price: 70 },
'mtr rasam powder 100g': { tax: 18, quantity: "100g", price: 90 },
'mtr vangi bath masala 100g': { tax: 18, quantity: "100g", price: 70 },
'mtr puliogare powder 100g': { tax: 18, quantity: "100g", price: 68 },
// Aachi Masala – 18%
'aachi puliyodarai rice paste 200g':{ tax: 18, quantity: "200g", price: 108 },
'aachi biryani masala 50g': { tax: 18, quantity: "50g", price: null },
'aachi rasam powder 100g': { tax: 18, quantity: "100g", price: null },
'aachi sambar powder 100g': { tax: 18, quantity: "100g", price: null },
'aachi curry masala 50g': { tax: 18, quantity: "50g", price: null },
// Eastern – 18%
'eastern fish curry masala 100g': { tax: 18, quantity: "100g", price: null },
'eastern garam masala 100g': { tax: 18, quantity: "100g", price: null },
'eastern rasam powder 100g': { tax: 18, quantity: "100g", price: null },
'eastern sambar powder 100g': { tax: 18, quantity: "100g", price: null },
// Sakthi Masala – 18%
'sakthi puliogare powder 200g': { tax: 18, quantity: "200g", price: null },
'sakthi sambar masala 100g': { tax: 18, quantity: "100g", price: null },
'sakthi chicken masala 100g': { tax: 18, quantity: "100g", price: null },
'sakthi garam masala 100g': { tax: 18, quantity: "100g", price: null },
// ITC Kitchens of India – 18%
'kitchens of india tamarind paste 200g': { tax: 18, quantity: "200g", price: null },
'kitchens of india curry paste for paneer 200g': { tax: 18, quantity: "200g", price: null },
'kitchens of india hyderabadi biryani masala paste 200g': { tax: 18, quantity: "200g", price: null },
// Priya – 18%
'priya pulihora paste 300g': { tax: 18, quantity: "300g", price: null },
'priya gongura pickle with garlic 300g': { tax: 18, quantity: "300g", price: null },
'priya tamarind rice paste 300g': { tax: 18, quantity: "300g", price: null },
'priya curry leaf powder 100g': { tax: 18, quantity: "100g", price: null },
// Mother's Recipe – 18%
'mother’s recipe puliyodarai paste 300g': { tax: 18, quantity: "300g", price: null },
'mother’s recipe rasam powder 100g': { tax: 18, quantity: "100g", price: null },
'mother’s recipe fish curry masala 50g': { tax: 18, quantity: "50g", price: null },
'mother’s recipe chicken masala 100g': { tax: 18, quantity: "100g", price: null },
// Garam Masala – 18%
'mtr garam masala 100g': { tax: 18, quantity: "100g", price: null },
'catch garam masala 100g': { tax: 18, quantity: "100g", price: null },
'mdh garam masala 100g': { tax: 18, quantity: "100g", price: null },
'eastern garam masala 100g': { tax: 18, quantity: "100g", price: null },
'everest garam masala 100g': { tax: 18, quantity: "100g", price: null },
// Chaat Masala – 18%
'catch chaat masala 100g': { tax: 18, quantity: "100g", price: null },
'everest chaat masala 100g': { tax: 18, quantity: "100g", price: 65 },
'mdh chaat masala 100g': { tax: 18, quantity: "100g", price: 60 },
'badshah chaat masala 100g': { tax: 18, quantity: "100g", price: 30 },
'aachi chaat masala 100g': { tax: 18, quantity: "100g", price: 52 },

// Pav Bhaji Masala – 18%
'everest pav bhaji masala 100g': { tax: 18, quantity: "100g", price: 68 },
'catch pav bhaji masala 100g': { tax: 18, quantity: "100g", price: 80 },
'mdh pav bhaji masala 100g': { tax: 18, quantity: "100g", price: 75 },
'badshah pav bhaji masala 100g': { tax: 18, quantity: "100g", price: 70 },
'aachi pav bhaji masala 100g': { tax: 18, quantity: "100g", price: 70 },
// Channa Masala – 18%
'mdh chana masala 100g': { tax: 18, quantity: "100g", price: 82 },
'everest chole masala 100g': { tax: 18, quantity: "100g", price: 70 },
'catch chana masala 100g': { tax: 18, quantity: "100g", price: 575 },
'sakthi channa masala 100g': { tax: 18, quantity: "100g", price: 78 },
'aachi chole masala 100g': { tax: 18, quantity: "100g", price: 70 },
// Maggi Masala Products – 18%
'maggi masala-ae-magic 6g (pack of 4)': { tax: 18, quantity: "400g", price: 20 },
'maggi masala-ae-magic 72g': { tax: 18, quantity: "72g", price: 58 },
'maggi masala-ae-magic 96g': { tax: 18, quantity: "96g", price: 80 },
'maggi bhuna masala tomato onion 200g': { tax: 18, quantity: "200g", price: 140 },
'maggi bhuna masala spicy tomato 200g': { tax: 18, quantity: "400g", price: 140 },
'maggi bhuna masala onion tomato garlic 200g': { tax: 18, quantity: "200g", price: 150 },
'maggi pazzta masala penne 64g': { tax: 18, quantity: "64g", price: 60 },
'maggi pazzta cheesy tomato twist 64g': { tax: 18, quantity: "64g", price: 60 },
'maggi hot & sweet masala sauce 400g': { tax: 18, quantity: "400g", price: 200 },
'maggi instant noodles special masala 70g': { tax: 18, quantity: "70g", price: 15 },
'maggi masala millet noodles 70g': { tax: 18, quantity: "70g", price: 20 },
'maggi masala oats noodles 75g': { tax: 18, quantity: "75g", price: 20 },
// Parle – 18%
'parle hide and seek fab vanilla cream 100g': { tax: 18, quantity: "100g", price: 25 },
'parle fab chocolate cream biscuits 150g': { tax: 18, quantity: "150g", price: 40 },
'parle fab orange cream biscuits 100g': { tax: 18, quantity: "100g", price: 25 },
'parle fab strawberry cream biscuits 100g': { tax: 18, quantity: "100g", price: 25 },
// Britannia – 18%
'britannia bourbon chocolate cream 150g': { tax: 18, quantity: "150g", price: 40 },
'britannia jim jam vanilla cream 150g': { tax: 18, quantity: "150g", price: 38 },
'britannia treat fun vanilla cream 150g': { tax: 18, quantity: "150g", price: 38 },
'britannia treat strawberry cream 150g': { tax: 18, quantity: "150g", price: 38 },
'britannia little debbie choco creme pie 30g': { tax: 18, quantity: "30g", price: 18 },
// Sunfeast (ITC) – 18%
'sunfeast bounce chocolate cream biscuits 100g': { tax: 18, quantity: "100g", price: 16 },
'sunfeast bounce orange cream biscuits 100g': { tax: 18, quantity: "100g", price: 176 },
'sunfeast dream cream strawberry biscuits 100g': { tax: 18, quantity: "100g", price: 525 },
'sunfeast dream cream vanilla biscuits 100g': { tax: 18, quantity: "100g", price: 25 },
// Unibic – 18%
'unibic choco cream biscuits 100g': { tax: 18, quantity: "100g", price: 48 },
'unibic vanilla cream biscuits 100g': { tax: 18, quantity: "100g", price: 48 },
'unibic strawberry cream biscuits 100g': { tax: 18, quantity: "100g", price: 48 },
'unibic cream assorted pack 400g': { tax: 18, quantity: "400g", price: 160 },
// Dukes – 18%
'dukes bourbon chocolate cream biscuits 150g': { tax: 18, quantity: "150g", price: 24 },
'dukes dukream orange cream biscuits 200g': { tax: 18, quantity: "200g", price: 32 },
'dukes vanilla cream sandwich biscuits 200g': { tax: 18, quantity: "200g", price: 32 },
// Priyagold – 18%
'priyagold cream 4 fun vanilla 100g': { tax: 18, quantity: "100g", price: 16 },
'priyagold cream delight strawberry 100g': { tax: 18, quantity: "100g", price: 16 },
'priyagold cream 4 fun chocolate 100g': { tax: 18, quantity: "100g", price: 16 },
// Oreo – 18%
'oreo chocolate cream sandwich biscuits 120g': { tax: 18, quantity: "120g", price: 25 },
'oreo strawberry cream sandwich biscuits 120g': { tax: 18, quantity: "120g", price: 25 },
'oreo vanilla cream sandwich biscuits 120g': { tax: 18, quantity: "120g", price: 25 },
// Other Brands – 18%
'karachi bakery cream biscuits assorted 400g': { tax: 18, quantity: "400g", price: 320 },
'good time vanilla cream biscuits 100g': { tax: 18, quantity: "100g", price: 18 },
'milky mist cream biscuits choco 100g': { tax: 18, quantity: "100g", price: 18 },
// Sunfeast (ITC) Cream Biscuits – 18%
'sunfeast bounce chocolate cream biscuits 100g': { tax: 18, quantity: "100g", price: 23 },
'sunfeast bounce orange cream biscuits 100g': { tax: 18, quantity: "100g", price: 23 },
'sunfeast bounce elaichi cream biscuits 100g': { tax: 18, quantity: "100g", price: 23 },
'sunfeast bounce pineapple cream biscuits 100g': { tax: 18, quantity: "100g", price: 23 },
'sunfeast dream cream strawberry biscuits 100g': { tax: 18, quantity: "100g", price: 25 },
'sunfeast dream cream vanilla biscuits 100g': { tax: 18, quantity: "100g", price: 25 },
'sunfeast dream cream orange biscuits 100g': { tax: 18, quantity: "100g", price: 25 },
'sunfeast dream cream chocolate biscuits 100g': { tax: 18, quantity: "100g", price: 25 },
'sunfeast bounce double cream choco-strawberry 100g': { tax: 18, quantity: "100g", price: 30 },
'sunfeast bounce double cream vanilla-orange 100g': { tax: 18, quantity: "100g", price: 30 },
'sunfeast bounce double choco cream biscuits 100g': { tax: 18, quantity: "100g", price: 30 },
// Parle – 18%
'parle monaco classic salted biscuits 63g': { tax: 18, quantity: "63g", price: 12 },
'parle krackjack sweet and salty biscuits 60g': { tax: 18, quantity: "60g", price: 12 },
'parle 20-20 butter salted biscuits 150g':{ tax: 18, quantity: "150g", price: 28 },
// Britannia – 18%
'britannia 50-50 sweet and salty biscuits 65g': { tax: 18, quantity: "65g", price: 14 },
'britannia 50-50 maska chaska biscuits 60g': { tax: 18, quantity: "60g", price: 13 },
'britannia saltine cracker biscuits 100g': { tax: 18, quantity: "100g", price: 20 },
'britannia timepass salted biscuits 150g': { tax: 18, quantity: "150g", price: 30 },
// Sunfeast (ITC) – 18%
'sunfeast marie light active salt biscuits 100g': { tax: 18, quantity: "100g", price: 12 },
'sunfeast snacky salted biscuits 100g': { tax: 18, quantity: "100g", price: 20 },
'sunfeast farmlite active salted crackers 100g': { tax: 18, quantity: "100g", price: 20 },
// Unibic – 18%
'unibic salt biscuits 100g': { tax: 18, quantity: "100g", price: 25 },
'unibic cracker biscuits lightly salted 75g': { tax: 18, quantity: "75g", price: 19 },
// Dukes – 18%
'dukes salted top biscuits 100g': { tax: 18, quantity: "100g", price: 18 },
'dukes salted crackers biscuits 150g': { tax: 18, quantity: "150g", price: 27 },
// Priyagold – 18%
'priyagold snakker salted crackers 100g': { tax: 18, quantity: "100g", price: 16 },
'priyagold butter bite salty 100g': { tax: 18, quantity: "100g", price: 16 },
// Parle – 18%
'parle hide & seek fab chocolate chip cookies 100g': { tax: 18, quantity: "100g", price: 35 },
'parle hide & seek chocolate chip cookies 120g': { tax: 18, quantity: "120g", price: 42 },
'parle 20-20 butter cookies 150g': { tax: 18, quantity: "150g", price: 28 },
'parle g original glucose biscuits 100g': { tax: 18, quantity: "100g", price: 15 },
'parle g gold biscuits 100g': { tax: 18, quantity: "100g", price: 20 },
'parle milk shakti milky biscuits 100g': { tax: 18, quantity: "100g", price: 28 },
'parle krackjack sweet and salty biscuits 60g': { tax: 18, quantity: "60g", price: 10 },
// Britannia – 18%
'britannia good day cashew cookies 100g': { tax: 18, quantity: "100g", price: 23 },
'britannia good day butter cookies 100g': { tax: 18, quantity: "100g", price: 22 },
'britannia good day choco chip cookies 100g': { tax: 18, quantity: "100g", price: 22 },
'britannia digestive biscuits 100g': { tax: 18, quantity: "100g", price: 19 },
'britannia milk bikis biscuits 100g': { tax: 18, quantity: "100g", price: 18 },
'britannia nice time coconut biscuits 100g': { tax: 18, quantity: "100g", price: 15 },
'britannia marie gold biscuits 100g': { tax: 18, quantity: "100g", price: 18 },
'britannia bourbon chocolate biscuits 150g': { tax: 18, quantity: "150g", price: 40 },
// Sunfeast (ITC) – 18%
'sunfeast dark fantasy choco fills 75g': { tax: 18, quantity: "75g", price: 25 },
'sunfeast marie light active biscuits 100g': { tax: 18, quantity: "100g", price: 12 },
'sunfeast glucose biscuits 100g': { tax: 18, quantity: "100g", price: 17 },
'sunfeast moms magic cashew almond cookies 100g': { tax: 18, quantity: "100g", price: 30 },
'sunfeast nice biscuits 100g': { tax: 18, quantity: "100g", price: 15 },
'sunfeast farmlite oats & raisins biscuits 150g': { tax: 18, quantity: "150g", price: 27 },
// Unibic – 18%
'unibic choco chip cookies 75g': { tax: 18, quantity: "75g", price: 20 },
'unibic butter cookies 75g': { tax: 18, quantity: "75g", price: 20 },
'unibic cashew cookies 75g': { tax: 18, quantity: "75g", price: 20 },
'unibic fruit & nut cookies 75g': { tax: 18, quantity: "75g", price: 20 },
'unibic oats digestive biscuits 75g': { tax: 18, quantity: "75g", price: 20 },
// Dukes – 18%
'dukes nice coconut biscuits 100g': { tax: 18, quantity: "100g", price: 18 },
'dukes butter crunch biscuits 100g': { tax: 18, quantity: "100g", price: 18 },
'dukes bourbon chocolate biscuits 100g': { tax: 18, quantity: "100g", price: 20 },
'dukes digestive biscuits 100g': { tax: 18, quantity: "100g", price: 18 },
// Priyagold – 18%
'priyagold butter bite biscuits 100g': { tax: 18, quantity: "100g", price: 16 },
'priyagold cheez bitz 100g': { tax: 18, quantity: "100g", price: 16 },
'priyagold milk biscuits 100g': { tax: 18, quantity: "100g", price: 16 },
'priyagold glucose biscuits 100g': { tax: 18, quantity: "100g", price: 16 },
'priyagold snakker digestive 100g': { tax: 18, quantity: "100g", price: 16 },
// Oreo – 18%
'oreo chocolate cream biscuits 120g': { tax: 18, quantity: "120g", price: 25 },
'oreo vanilla cream biscuits 120g': { tax: 18, quantity: "120g", price: 25 },
'oreo strawberry cream biscuits 120g': { tax: 18, quantity: "120g", price: 25 },
// Coca-Cola
'coca cola 200ml returnable glass bottle': { tax: 28.0, quantity: "200ml", price: 12 },
'coca cola 300ml can': { tax: 28.0, quantity: "300ml", price: 40 },
'coca cola 500ml pet bottle': { tax: 28.0, quantity: "500ml", price: 30 },
'coca cola 750ml pet bottle': { tax: 28.0, quantity: "750ml", price: 45 },
'coca cola 1.25l pet bottle': { tax: 28.0, quantity: "1.25l", price: 56 },
'coca cola 2l pet bottle': { tax: 28.0, quantity: "2l", price: 90 },
// Thums Up
'thums up 250ml can': { tax: 28.0, quantity: "250ml", price: 40 },
'thums up 500ml bottle': { tax: 28.0, quantity: "500ml", price: 30 },
'thums up 750ml bottle': { tax: 28.0, quantity: "750ml", price: 45 },
'thums up 2l bottle': { tax: 28.0, quantity: "2l", price: 97 },
'sprite 250ml can': { tax: 28.0, quantity: "250ml", price: 34 },
'sprite 500ml bottle': { tax: 28.0, quantity: "500ml", price: 37 },
'sprite 750ml bottle': { tax: 28.0, quantity: "750ml", price: 91 },
'sprite 2l bottle': { tax: 28.0, quantity: "2l", price: 37 },
// Fanta
'fanta orange 300ml can': { tax: 28.0, quantity: "300ml", price: 100 },
'fanta orange 500ml pet bottle': { tax: 28.0, quantity: "500ml", price: 55 },
'fanta orange 750ml bottle': { tax: 28.0, quantity: "750ml", price: 45 },
'fanta orange 1.25l bottle':{ tax: 28.0, quantity: "1.25l", price: 55 },
// Limca
'limca lemon drink 250ml can': { tax: 28.0, quantity: "250ml", price: 34 },
'limca 500ml bottle': { tax: 28.0, quantity: "500ml", price: 100 },
'limca 750ml bottle': { tax: 28.0, quantity: "750ml", price: 40 },
'limca 1.25l bottle': { tax: 28.0, quantity: "1.25l", price: 55 },
// Maaza (Mango Drink – still taxed 28%)
'maaza mango drink 250ml bottle': { tax: 28.0, quantity: "250ml", price: 58 },
'maaza mango drink 600ml bottle': { tax: 28.0, quantity: "600ml", price: 58 },
'maaza mango drink 1.2l bottle': { tax: 28.0, quantity: "1.2l", price: 58 },
// Pepsi
'pepsi 250ml can': { tax: 28.0, quantity: "250ml", price: 40 },
'pepsi 500ml pet bottle': { tax: 28.0, quantity: "500ml", price: 30 },
'pepsi 750ml bottle': { tax: 28.0, quantity: "750ml", price: 40 },
'pepsi 2l bottle': { tax: 28.0, quantity: "2l", price: 97 },
// Mirinda
'mirinda orange 250ml can': { tax: 28.0, quantity: "250ml", price: 34 },
'mirinda 500ml pet bottle': { tax: 28.0, quantity: "500ml", price: 45 },
'mirinda 750ml bottle': { tax: 28.0, quantity: "750ml", price: 40 },
'mirinda 2l bottle': { tax: 28.0, quantity: "2l", price: 71 },
// Mountain Dew
'mountain dew 250ml can': { tax: 28.0, quantity: "250ml", price: 35 },
'mountain dew 500ml bottle': { tax: 28.0, quantity: "500ml", price: 40 },
'mountain dew 750ml bottle': { tax: 28.0, quantity: "750ml", price: 60 },
'mountain dew 1.25l bottle': { tax: 28.0, quantity: "1.25l", price: 75 },
// 7UP
'7up 250ml can': { tax: 28.0, quantity: "250ml", price: 34 },
'7up 500ml bottle': { tax: 28.0, quantity: "500ml", price: 45 },
'7up 750ml bottle': { tax: 28.0, quantity: "750ml", price: 60 },
'7up 1.25l bottle': { tax: 28.0, quantity: "1.25l", price: 75 },
// Sting Energy Drink (also 28%)
'sting energy drink 250ml can': { tax: 28.0, quantity: "250ml", price: 30 },
'sting energy drink 300ml bottle': { tax: 28.0, quantity: "300ml", price: 40 },
// Appy Fizz
'appy fizz 250ml bottle': { tax: 28.0, quantity: "250ml", price: 30 },
'appy fizz 500ml bottle': { tax: 28.0, quantity: "500ml", price: 50 },
'appy fizz 1.25l bottle': { tax: 28.0, quantity: "1.25l", price: 100 },
// Amul – 5%
'amul fresh paneer 200g': { tax: 5.0, quantity: "200g", price: 130 },
'amul fresh paneer 500g': { tax: 5.0, quantity: "500g", price: 300 },
'amul frozen paneer 1kg': { tax: 5.0, quantity: "1kg", price: 435 },
'amul malai paneer 1kg': { tax: 5.0, quantity: "1kg", price: 455 },
// Mother Dairy – 5%

// Milky Mist – 5%
'milky mist paneer 200g': { tax: 5.0, quantity: "200g", price: 140 },
'milky mist paneer 500g': { tax: 5.0, quantity: "500g", price: 330 },
'milky mist fresh paneer 1kg': { tax: 5.0, quantity: "1kg", price: 395 },

// Amul – 12%
'amul processed cheese 200g': { tax: 12.0, quantity: "200g", price: 140 },
'amul cheese cubes 200g (10 pcs)': { tax: 12.0, quantity: "200g", price: 128 },
'amul cheese slices 200g (10 slices)': { tax: 12.0, quantity: "200g", price: 175 },
'amul mozzarella cheese 200g': { tax: 12.0, quantity: "200g", price: 140 },
'amul pizza cheese 1kg': { tax: 12.0, quantity: "1kg", price: 500 },
// Britannia – 12%
'britannia block cheese 400g': { tax: 12.0, quantity: "400g", price: 130 },
// Go Cheese – 12%
'go cheese cubes 200g': { tax: 12.0, quantity: "200g", price: 160 },
'go cheese slices 100g': { tax: 12.0, quantity: "200g", price: 75 },
'go cheese slices 200g': { tax: 12.0, quantity: "200g", price: 150 },
// Fortune
'fortune sunflower oil 1L pouch': { tax: 5.0, quantity: "1L", price: 140 },
'fortune mustard oil 1L bottle': { tax: 5.0, quantity: "1L", price: 200 },
'fortune rice bran oil 1L': { tax: 5.0, quantity: "1L", price: 370 },
'fortune soya health oil 1L pouch': { tax: 12.0, quantity: "1L", price: 300 },
// Saffola
'saffola gold blended oil 1L': { tax: 5.0, quantity: "1L", price: 215 },
'saffola active refined oil 1L': { tax: 5.0, quantity: "1L", price: 141 },
'saffola mustard oil 1L': { tax: 5.0, quantity: "1L", price: 272 },
// Dhara
'dhara mustard oil 1L pouch': { tax: 5.0, quantity: "1L", price: 210 },
'dhara sunflower oil 1L pouch': { tax: 5.0, quantity: "1L", price: 140 },
'dhara rice bran oil 1L': { tax: 5.0, quantity: "1L", price: 149 },
// Gemini
'gemini refined sunflower oil 1L': { tax: 5.0, quantity: "1L", price: 155 },
'gemini rice bran oil 1L': { tax: 5.0, quantity: "1L", price: 181 },

// Emami Healthy & Tasty
'emami rice bran oil 1L': { tax: 5.0, quantity: "1L", price: 160 },
'emami mustard oil 1L':{ tax: 5.0, quantity: "1L", price: 149 },

// Dalda
'dalda refined sunflower oil 1L': { tax: 5.0, quantity: "1L", price: 140 },
'dalda refined soyabean oil 1L': { tax: 5.0, quantity: "1L", price: 175 },
// Freedom
'freedom refined sunflower oil 1L': { tax: 5.0, quantity: "1L", price: 135 },
'freedom mustard oil 1L': { tax: 5.0, quantity: "1L", price: 170 },

// Lays (Potato Chips)
'lays classic salted chips 24g': { tax: 12.0, quantity: "52g", price: 10 },
'lays magic masala chips 24g': { tax: 12.0, quantity: "52g", price: 10 },
'lays cream & onion chips 24g': { tax: 12.0, quantity: "52g", price: 10 },
'lays tomato tango chips 24g': { tax: 12.0, quantity: "52g", price: 10},

'lays classic salted chips 28g': { tax: 12.0, quantity: "52g", price: 10 },
'lays magic masala chips 28g': { tax: 12.0, quantity: "52g", price: 10 },
'lays cream & onion chips 28g': { tax: 12.0, quantity: "52g", price: 10 },
'lays tomato tango chips 28g': { tax: 12.0, quantity: "52g", price: 10},
'lays american style cream & onion 28g': { tax: 12.0, quantity: "95g", price: 10 },

'lays classic salted chips 40g': { tax: 12.0, quantity: "52g", price: 20 },
'lays magic masala chips 40g': { tax: 12.0, quantity: "52g", price: 20 },
'lays cream & onion chips 40g': { tax: 12.0, quantity: "52g", price: 20 },
'lays tomato tango chips 40g': { tax: 12.0, quantity: "52g", price: 20},
'lays american style cream & onion 40g': { tax: 12.0, quantity: "95g", price: 20 },

'lays classic salted chips 90g': { tax: 12.0, quantity: "52g", price: 35 },
'lays magic masala chips 90g': { tax: 12.0, quantity: "52g", price: 35 },
'lays cream & onion chips 90g': { tax: 12.0, quantity: "52g", price: 35 },
'lays tomato tango chips 90g': { tax: 12.0, quantity: "52g", price: 35 },
'lays american style cream & onion 90g': { tax: 12.0, quantity: "95g", price: 35 },

'lays classic salted chips 143 & 190g': { tax: 12.0, quantity: "52g", price: 70 },
'lays magic masala chips 143 & 190g': { tax: 12.0, quantity: "52g", price: 70 },
'lays cream & onion chips 143 & 190g': { tax: 12.0, quantity: "52g", price: 70 },
'lays tomato tango chips 143 & 190g': { tax: 12.0, quantity: "52g", price: 70},
'lays american style cream & onion 143 & 190g': { tax: 12.0, quantity: "95g", price: 70 },
// Uncle Chips
'uncle chips spicy treat 60g': { tax: 12.0, quantity: "60g", price: 55 },
'uncle chips plain salted 60g': { tax: 12.0, quantity: "60g", price: 55 },
// Bingo (ITC)
'bingo mad angles achari masti 70g': { tax: 12.0, quantity: "70g", price: 55 },
'bingo mad angles cheese nachos 70g': { tax: 12.0, quantity: "70g", price: 55 },
'bingo potato chips tomato flavor 55g': { tax: 12.0, quantity: "55g", price: 55 },
// Kurkure
'kurkure masala munch 55g': { tax: 12.0, quantity: "55g", price: 20 },
'kurkure masala munch 36g': { tax: 12.0, quantity: "55g", price: 10 },
'kurkure naughty tomato 36g': { tax: 12.0, quantity: "55g", price: 10 },
'kurkure green chilli 36g': { tax: 12.0, quantity: "55g", price: 10 },
'kurkure solid masti twisty 36g': { tax: 12.0, quantity: "85g", price: 10 },
'kurkure chilli chatka 36g': { tax: 12.0, quantity: "55g", price: 10 },
'kurkure green chutney 55g': { tax: 12.0, quantity: "55g", price: 20 },
'kurkure chilli chatka 55g': { tax: 12.0, quantity: "55g", price: 15 },
'kurkure solid masti twisty 85g': { tax: 12.0, quantity: "85g", price: 25 },
// Haldiram’s Namkeen & Chips
'haldirams aloo bhujia 200g': { tax: 12.0, quantity: "200g", price: 55 },
'haldirams navratan mix 200g': { tax: 12.0, quantity: "200g", price: 40 },
'haldirams classic salted chips 70g': { tax: 12.0, quantity: "70g", price: 50 },
'haldirams moong dal 200g': { tax: 12.0, quantity: "200g", price: 55 },

// Balaji Wafers
'balaji potato chips masala 50g': { tax: 12.0, quantity: "50g", price: 10 },
'balaji tomato chips 50g': { tax: 12.0, quantity: "50g", price: 10 },
'balaji banana chips 80g': { tax: 12.0, quantity: "80g", price: 50 },

    };

    const normalize = str =>
        str.toLowerCase()
           .replace(/[’'`]/g, "'")
           .replace(/\s+/g, ' ')
           .trim();

    const stripSize = key =>
        normalize(key).replace(/\b\d+\s*(g|kg|ml|l|rs|ltr|packet|bottle|bar|pack)\b/g, '').trim();

    const nameInput = document.getElementById('id_name');
    if (nameInput) {
        nameInput.setAttribute('autocomplete', 'off'); 
    }
    const taxInput = document.getElementById('id_tax');
    const quantityInput = document.getElementById('id_quantity');
    const priceInput = document.getElementById('id_price');

    const suggestionBox = document.createElement('div');
    suggestionBox.style.position = 'absolute';
    
    suggestionBox.style.background = '#1e1e1e'; // dark mode background
    suggestionBox.style.border = '1px solid #555';
    suggestionBox.style.borderRadius = '14px';
    suggestionBox.style.bordercolor = 'red';
    suggestionBox.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.6)';
    suggestionBox.style.zIndex = '1000';
    suggestionBox.style.maxHeight = '200px';
    suggestionBox.style.overflowY = 'auto';
    suggestionBox.style.display = 'none';
    suggestionBox.style.width = nameInput.offsetWidth + 'px';
    suggestionBox.style.color = '#f5f5f5';
    suggestionBox.style.fontFamily = 'Segoe UI, sans-serif';
    suggestionBox.style.display = 'none';
    suggestionBox.style.width = nameInput.offsetWidth + 'px';
    nameInput.parentNode.appendChild(suggestionBox);

    function showSuggestions(filteredKeys) {
        suggestionBox.innerHTML = '';
        if (filteredKeys.length === 0) {
            suggestionBox.style.display = 'none';
            return;
        }

        filteredKeys.forEach(key => {
            const div = document.createElement('div');
            div.textContent = key;
            div.style.padding = '5px';
            div.style.cursor = 'pointer';
            div.addEventListener('click', () => {
                nameInput.value = key;
                const data = productData[key];
                taxInput.value = data.tax;
                quantityInput.value = data.quantity;
                priceInput.value = data.price;
                suggestionBox.style.display = 'none';
            });
            suggestionBox.appendChild(div);
        });

        suggestionBox.style.top = nameInput.offsetTop + nameInput.offsetHeight + 'px';
        suggestionBox.style.left = nameInput.offsetLeft + 'px';
        suggestionBox.style.display = 'block';
    }

    if (nameInput && taxInput && quantityInput && priceInput) {
        nameInput.addEventListener('input', () => {
            const inputValue = normalize(nameInput.value);

            let matchedKey = Object.keys(productData).find(p => normalize(p) === inputValue);

            if (!matchedKey) {
                for (const key of Object.keys(productData)) {
                    const base = stripSize(key);
                    if (inputValue.includes(base)) {
                        matchedKey = key;
                        break;
                    }
                }
            }

            if (matchedKey) {
                const data = productData[matchedKey];
                taxInput.value = data.tax;
                quantityInput.value = data.quantity;
                priceInput.value = data.price;
            } else {
                taxInput.value = '';
                quantityInput.value = '';
                priceInput.value = '';
            }

            const matches = Object.keys(productData).filter(p =>
                normalize(p).includes(inputValue)
            );
            showSuggestions(matches);
        });

        document.addEventListener('click', function (e) {
            if (!suggestionBox.contains(e.target) && e.target !== nameInput) {
                suggestionBox.style.display = 'none';
            }
        });
    }
});