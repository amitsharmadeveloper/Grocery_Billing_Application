function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('show');
}

// Voice Search using Web Speech API
function startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Your browser does not support voice search.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onstart = () => console.log("Voice recognition started. Speak now.");
    recognition.onspeechend = () => recognition.stop();

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.trim();
        console.log("You said:", transcript);
        document.getElementById('searchInput').value = transcript;
        searchProduct(transcript);
    };

    recognition.onerror = function (event) {
        console.error("Voice search error:", event.error);
        alert("Voice search error: " + event.error);
    };
}

// Trigger search
function searchProduct(query) {
    query = query.trim();
    const url = `/search?q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const newContent = doc.querySelector('.product-grid');
            const newStatus = doc.querySelector('#search-status');

            if (newContent) {
                document.querySelector('.product-grid').innerHTML = newContent.innerHTML;
            }

            if (newStatus) {
                document.getElementById('search-status').innerHTML = newStatus.innerHTML;
            } else {
                document.getElementById('search-status').innerHTML = '';
            }
        })
        .catch(() => {
            document.querySelector('.product-grid').innerHTML = `<p style="color:red;">Something went wrong.</p>`;
            document.getElementById('search-status').innerHTML = '';
        });
        function adjustSuggestionBoxWidth() {
            const input = document.getElementById('searchInput');
            const suggestions = document.getElementById('search-suggestions');
            if (input && suggestions) {
                const inputRect = input.getBoundingClientRect();
                suggestions.style.width = `${input.offsetWidth}px`;
                suggestions.style.left = `${input.offsetLeft}px`;
            }
        }        
}

// Image Search
function previewImageSearch() {
    const input = document.getElementById('image-upload');
    const file = input.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        // Show preview
        const preview = document.getElementById('image-preview') || document.createElement('div');
        preview.id = 'image-preview';
        input.parentNode.appendChild(preview);

        const reader = new FileReader();
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="max-height: 150px; border-radius: 10px; margin-top: 10px;">`;
        };
        reader.readAsDataURL(file);

        fetch('/image-search/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCSRFToken()
            },
            body: formData,
        })
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const newGrid = doc.querySelector('.product-grid');
            if (newGrid) {
                document.querySelector('.product-grid').innerHTML = newGrid.innerHTML;
            }

            const newStatus = doc.querySelector('#search-status');
            if (newStatus) {
                document.getElementById('search-status').innerHTML = newStatus.innerHTML;
            } else {
                document.getElementById('search-status').innerHTML = '';
            }
        })
        .catch(() => {
            document.querySelector('.product-grid').innerHTML = `<p style="color:red;">Something went wrong.</p>`;
            document.getElementById('search-status').innerHTML = '';
        });
    }
}

function getCSRFToken() {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const trimmed = cookie.trim();
        if (trimmed.startsWith(name + '=')) {
            return decodeURIComponent(trimmed.substring(name.length + 1));
        }
    }
    return '';
}

// ==========================
// ✅ Product Name Suggestions
// ==========================
document.addEventListener('DOMContentLoaded', function () {
    const productList = [
'kissan tomato ketchup 500g',
'kissan no onion no garlic ketchup 200g',
'maggi rich tomato ketchup 500g',
'maggi hot & sweet tomato chilli sauce 400g',
'heinz tomato ketchup 400g',
'del monte tomato ketchup 950g',
'veeba tomato ketchup 350g',
'tops tomato ketchup 500g',
'american garden tomato ketchup 794g',
'naturin tomato ketchup 1kg',
'funfoods classic tomato ketchup 850g',
'organic tattva tomato ketchup 500g',
'wingreens farm tomato ketchup 200g',
'hellmann’s tomato ketchup 360g',
'fortune tomato ketchup 200g',
// Soya Sauce – 12%
'ching’s dark soya sauce 200ml',
'ching’s soy sauce 90ml pouch',
'kikkoman naturally brewed soy sauce 250ml',
'kikkoman less salt soy sauce 250ml',
'blue dragon light soy sauce 150ml',
'blue dragon dark soy sauce 250ml',
'knorr soya sauce 200ml',
'del monte soy sauce 250ml',
'fortune soy sauce 100ml',
'veeba soy sauce 300g',
'tops soya sauce 200g',
'american garden soy sauce 400ml',
'smith & jones soy sauce 200g',
'urban platter gluten free soy sauce 250ml',
'naturin soya sauce 200ml',
// Red Chilli Sauce – 12%
'ching’s red chilli sauce 190g',
'ching’s red chilli sauce 680g',
'veeba red chilli sauce 300g',
'del monte red chilli sauce 200g',
'tops red chilli sauce 250g',
'american garden red chilli sauce 400g',
'wingreens red chilli garlic sauce 200g',
'smith & jones red chilli sauce 200g',
'naturin red chilli sauce 500g',
'funfoods hot red chilli sauce 240g',
'fortune red chilli sauce 250g',
'urban platter red chilli sauce 300g',
'hellmann’s red chilli sauce 400g',
// Green Chilli Sauce – 12%
'ching’s green chilli sauce 190g',
'ching’s green chilli sauce 680g',
'veeba green chilli sauce 300g',

// Mayonnaise – 18%
'funfoods veg mayonnaise 250g',
'funfoods egg mayonnaise 250g',
'funfoods garlic mayonnaise 250g',
'veeba classic mayonnaise 250g',
'veeba eggless mayonnaise 300g',
'veeba peri peri mayo 250g',
'del monte eggless mayonnaise 275g',
'hellmann’s real mayonnaise 400g',
// Pasta – 18%
'weikfield pasta penne 400g',
'weikfield pasta fusilli 400g',
'weikfield pasta elbows 400g',
'weikfield macaroni 400g',
'barilla penne pasta 500g',
'barilla fusilli pasta 500g',
'barilla spaghetti no.5 500g',

'chef’s basket whole wheat pasta 250g',
'chef’s basket spaghetti 250g',
'organic tattva penne pasta 250g',
'organic tattva whole wheat pasta 250g',
'urban platter penne pasta 500g',
'fortune durum wheat pasta penne 500g',
// Yippee Pasta – 18%
'yippee tricolor pasta treat 65g',
'yippee saucy masala pasta 65g',
'yippee pasta treat tomato cheese 65g',
'yippee pasta treat cheese 65g',
'yippee masala pasta treat 65g',
'yippee pasta 4-in-1 pack 260g',
// Maggi Noodles – 18%
'maggi masala noodles 70g',
'maggi masala noodles 280g (4-pack)',
'maggi 2-minute masala noodles 560g (8-pack)',
'maggi chicken noodles 70g',
'maggi veg atta noodles 80g',
'maggi oats noodles 75g',
'maggi special masala noodles 72g',
'maggi pazzta cheesy tomato 64g',
'maggi pazzta masala penne 64g',
'maggi pazzta mushroom penne 64g',
'maggi pazzta cheese macaroni 64g',
'maggi cup noodles veg 70g',
'maggi cup noodles chicken 70g',
'maggi fusion hot & sweet noodles 70g',
'maggi fusion schezwan noodles 70g',
'maggi fusion spicy garlic noodles 70g',
// Haldiram’s Fried Snacks – 12%
'haldiram’s aloo bhujia 200g',
'haldiram’s moong dal 200g',
'haldiram’s navratan mixture 400g',
'haldiram’s masala peanuts 200g',
'haldiram’s khatta meetha 400g',
'haldiram’s chana chor garam 200g',
'haldiram’s sev bhujia 400g',
// Bikaji – 12%
'bikaji bhujia 400g',
'bikaji aloo lachha 200g',
'bikaji moong dal 200g',
'bikaji khatta meetha 400g',
'bikaji chana dal 200g',
'bikaji navratan mix 400g',
// Balaji – 12%
'balaji sev bhujia 200g',
'balaji aloo bhujia 200g',
'balaji khatta meetha mixture 400g',
// Bikanervala – 12%
'bikanervala classic namkeen mix 400g',
'bikanervala dal moth 200g',
'bikanervala aloo bhujia 200g',
// Local/Other Brands – 12%
'lehar aloo bhujia 200g',
'halke fulke masala rings 200g',
'kuchh bhi chana dal namkeen 200g',
'raju sev mixture 250g',
// McCain – 5%
'mccain french fries 420g',
'mccain smileys 400g',
'mccain chilli garlic potato bites 400g',
'mccain veggie nuggets 400g',
'mccain potato cheese shotz 400g',
'mccain masala fries 420g',
'mccain aloo tikki 400g',
// ITC Master Chef (Veg) – 5%
'itc master chef crispy french fries 400g',
'itc master chef cheese corn nuggets 400g',
'itc master chef veg sticks 400g',
'itc master chef potato cheese bites 400g',
// Other Brands – 5%
'godrej yummiez aloo tikki 400g',
'fresho frozen veggie mix balls 400g',
'meatzza veg cheese nuggets 400g',
'safal frozen veg cutlet 400g',
// MTR Masala Packets – 18%
'mtr puliyogare paste 200g',
'mtr bisi bele bath masala 100g',
'mtr sambhar masala 100g',
'mtr rasam powder 100g',
'mtr vangi bath masala 100g',
'mtr puliogare powder 100g',
// Aachi Masala – 18%
'aachi puliyodarai rice paste 200g',
'aachi biryani masala 50g',
'aachi rasam powder 100g',
'aachi sambar powder 100g',
'aachi curry masala 50g',
// Eastern – 18%
'eastern fish curry masala 100g',
'eastern garam masala 100g',
'eastern rasam powder 100g',
'eastern sambar powder 100g',
// Sakthi Masala – 18%
'sakthi puliogare powder 200g',
'sakthi sambar masala 100g',
'sakthi chicken masala 100g',
'sakthi garam masala 100g',
// ITC Kitchens of India – 18%
'kitchens of india tamarind paste 200g',
'kitchens of india curry paste for paneer 200g',
'kitchens of india hyderabadi biryani masala paste 200g',
// Priya – 18%
'priya pulihora paste 300g',
'priya gongura pickle with garlic 300g',
'priya tamarind rice paste 300g',
'priya curry leaf powder 100g',
// Mother's Recipe – 18%
'mother’s recipe puliyodarai paste 300g',
'mother’s recipe rasam powder 100g',
'mother’s recipe fish curry masala 50g',
'mother’s recipe chicken masala 100g',
// Garam Masala – 18%
'mtr garam masala 100g',
'catch garam masala 100g',
'mdh garam masala 100g',
'eastern garam masala 100g',
'everest garam masala 100g',
// Chaat Masala – 18%
'catch chaat masala 100g',
'everest chaat masala 100g',
'mdh chaat masala 100g',
'badshah chaat masala 100g',
'aachi chaat masala 100g',

// Pav Bhaji Masala – 18%
'everest pav bhaji masala 100g',
'catch pav bhaji masala 100g',
'mdh pav bhaji masala 100g',
'badshah pav bhaji masala 100g',
'aachi pav bhaji masala 100g',
// Channa Masala – 18%
'mdh chana masala 100g',
'everest chole masala 100g',
'catch chana masala 100g',
'sakthi channa masala 100g',
'aachi chole masala 100g',
// Maggi Masala Products – 18%
'maggi masala-ae-magic 6g (pack of 4)',
'maggi masala-ae-magic 72g',
'maggi masala-ae-magic 96g',
'maggi bhuna masala tomato onion 200g',
'maggi bhuna masala spicy tomato 200g',
'maggi bhuna masala onion tomato garlic 200g',
'maggi pazzta masala penne 64g',
'maggi pazzta cheesy tomato twist 64g',
'maggi hot & sweet masala sauce 400g',
'maggi instant noodles special masala 70g',
'maggi masala millet noodles 70g',
'maggi masala oats noodles 75g',
// Parle – 18%
'parle hide and seek fab vanilla cream 100g',
'parle fab chocolate cream biscuits 150g',
'parle fab orange cream biscuits 100g',
'parle fab strawberry cream biscuits 100g',
// Britannia – 18%
'britannia bourbon chocolate cream 150g',
'britannia jim jam vanilla cream 150g',
'britannia treat fun vanilla cream 150g',
'britannia treat strawberry cream 150g',
'britannia little debbie choco creme pie 30g',
// Sunfeast (ITC) – 18%
'sunfeast bounce chocolate cream biscuits 100g',
'sunfeast bounce orange cream biscuits 100g',
'sunfeast dream cream strawberry biscuits 100g',
'sunfeast dream cream vanilla biscuits 100g',
// Unibic – 18%
'unibic choco cream biscuits 100g',
'unibic vanilla cream biscuits 100g',
'unibic strawberry cream biscuits 100g',
'unibic cream assorted pack 400g',
// Dukes – 18%
'dukes bourbon chocolate cream biscuits 150g',
'dukes dukream orange cream biscuits 200g',
'dukes vanilla cream sandwich biscuits 200g',
// Priyagold – 18%
'priyagold cream 4 fun vanilla 100g',
'priyagold cream delight strawberry 100g',
'priyagold cream 4 fun chocolate 100g',
// Oreo – 18%
'oreo chocolate cream sandwich biscuits 120g',
'oreo strawberry cream sandwich biscuits 120g',
'oreo vanilla cream sandwich biscuits 120g',
// Other Brands – 18%
'karachi bakery cream biscuits assorted 400g',
'good time vanilla cream biscuits 100g',
'milky mist cream biscuits choco 100g',
// Sunfeast (ITC) Cream Biscuits – 18%
'sunfeast bounce chocolate cream biscuits 100g',
'sunfeast bounce orange cream biscuits 100g',
'sunfeast bounce elaichi cream biscuits 100g',
'sunfeast bounce pineapple cream biscuits 100g',
'sunfeast dream cream strawberry biscuits 100g',
'sunfeast dream cream vanilla biscuits 100g',
'sunfeast dream cream orange biscuits 100g',
'sunfeast dream cream chocolate biscuits 100g',
'sunfeast bounce double cream choco-strawberry 100g',
'sunfeast bounce double cream vanilla-orange 100g',
'sunfeast bounce double choco cream biscuits 100g',
// Parle – 18%
'parle monaco classic salted biscuits 63g',
'parle krackjack sweet and salty biscuits 60g',
'parle 20-20 butter salted biscuits 150g',
// Britannia – 18%
'britannia 50-50 sweet and salty biscuits 65g',
'britannia 50-50 maska chaska biscuits 60g',
'britannia saltine cracker biscuits 100g',
'britannia timepass salted biscuits 150g',
// Sunfeast (ITC) – 18%
'sunfeast marie light active salt biscuits 100g',
'sunfeast snacky salted biscuits 100g',
'sunfeast farmlite active salted crackers 100g',
// Unibic – 18%
'unibic salt biscuits 100g',
'unibic cracker biscuits lightly salted 75g',
// Dukes – 18%
'dukes salted top biscuits 100g',
'dukes salted crackers biscuits 150g',
// Priyagold – 18%
'priyagold snakker salted crackers 100g',
'priyagold butter bite salty 100g',
// Parle – 18%
'parle hide & seek fab chocolate chip cookies 100g',
'parle hide & seek chocolate chip cookies 120g',
'parle 20-20 butter cookies 150g',
'parle g original glucose biscuits 100g',
'parle g gold biscuits 100g',
'parle milk shakti milky biscuits 100g',
'parle krackjack sweet and salty biscuits 60g',
// Britannia – 18%
'britannia good day cashew cookies 100g',
'britannia good day butter cookies 100g',
'britannia good day choco chip cookies 100g',
'britannia digestive biscuits 100g',
'britannia milk bikis biscuits 100g',
'britannia nice time coconut biscuits 100g',
'britannia marie gold biscuits 100g',
'britannia bourbon chocolate biscuits 150g',
// Sunfeast (ITC) – 18%
'sunfeast dark fantasy choco fills 75g',
'sunfeast marie light active biscuits 100g',
'sunfeast glucose biscuits 100g',
'sunfeast moms magic cashew almond cookies 100g',
'sunfeast nice biscuits 100g',
'sunfeast farmlite oats & raisins biscuits 150g',
// Unibic – 18%
'unibic choco chip cookies 75g',
'unibic butter cookies 75g',
'unibic cashew cookies 75g',
'unibic fruit & nut cookies 75g',
'unibic oats digestive biscuits 75g',
// Dukes – 18%
'dukes nice coconut biscuits 100g',
'dukes butter crunch biscuits 100g',
'dukes bourbon chocolate biscuits 100g',
'dukes digestive biscuits 100g',
// Priyagold – 18%
'priyagold butter bite biscuits 100g',
'priyagold cheez bitz 100g',
'priyagold milk biscuits 100g',
'priyagold glucose biscuits 100g',
'priyagold snakker digestive 100g',
// Oreo – 18%
'oreo chocolate cream biscuits 120g',
'oreo vanilla cream biscuits 120g',
'oreo strawberry cream biscuits 120g',
// Coca-Cola
'coca cola 200ml returnable glass bottle',
'coca cola 300ml can',
'coca cola 500ml pet bottle',
'coca cola 750ml pet bottle',
'coca cola 1.25l pet bottle',
'coca cola 2l pet bottle',
// Thums Up
'thums up 250ml can',
'thums up 500ml bottle',
'thums up 750ml bottle',
'thums up 2l bottle',
'sprite 250ml can',
'sprite 500ml bottle',
'sprite 750ml bottle',
'sprite 2l bottle',
// Fanta
'fanta orange 300ml can',
'fanta orange 500ml pet bottle',
'fanta orange 750ml bottle',
'fanta orange 1.25l bottle',
// Limca
'limca lemon drink 250ml can',
'limca 500ml bottle',
'limca 750ml bottle',
'limca 1.25l bottle',
// Maaza (Mango Drink – still taxed 28%)
'maaza mango drink 250ml bottle',
'maaza mango drink 600ml bottle',
'maaza mango drink 1.2l bottle',
// Pepsi
'pepsi 250ml can',
'pepsi 500ml pet bottle',
'pepsi 750ml bottle',
'pepsi 2l bottle',
// Mirinda
'mirinda orange 250ml can',
'mirinda 500ml pet bottle',
'mirinda 750ml bottle',
'mirinda 2l bottle',
// Mountain Dew
'mountain dew 250ml can',
'mountain dew 500ml bottle',
'mountain dew 750ml bottle',
'mountain dew 1.25l bottle',
// 7UP
'7up 250ml can',
'7up 500ml bottle',
'7up 750ml bottle',
'7up 1.25l bottle',
// Sting Energy Drink (also 28%)
'sting energy drink 250ml can',
'sting energy drink 300ml bottle',
// Appy Fizz
'appy fizz 250ml bottle',
'appy fizz 500ml bottle',
'appy fizz 1.25l bottle',
// Amul – 5%
'amul fresh paneer 200g',
'amul fresh paneer 500g',
'amul frozen paneer 1kg',
'amul malai paneer 1kg',
// Mother Dairy – 5%

// Milky Mist – 5%
'milky mist paneer 200g',
'milky mist paneer 500g',
'milky mist fresh paneer 1kg',

// Amul – 12%
'amul processed cheese 200g',
'amul cheese cubes 200g (10 pcs)',
'amul cheese slices 200g (10 slices)',
'amul mozzarella cheese 200g',
'amul pizza cheese 1kg',
// Britannia – 12%
'britannia block cheese 400g',
// Go Cheese – 12%
'go cheese cubes 200g',
'go cheese slices 100g',
'go cheese slices 200g',
// Fortune
'fortune sunflower oil 1L pouch',
'fortune mustard oil 1L bottle',
'fortune rice bran oil 1L',
'fortune soya health oil 1L pouch',
// Saffola
'saffola gold blended oil 1L',
'saffola active refined oil 1L',
'saffola mustard oil 1L',
// Dhara
'dhara mustard oil 1L pouch',
'dhara sunflower oil 1L pouch',
'dhara rice bran oil 1L',
// Gemini
'gemini refined sunflower oil 1L',
'gemini rice bran oil 1L',

// Emami Healthy & Tasty
'emami rice bran oil 1L',
'emami mustard oil 1L',

// Dalda
'dalda refined sunflower oil 1L',
'dalda refined soyabean oil 1L',
// Freedom
'freedom refined sunflower oil 1L',
'freedom mustard oil 1L',

// Lays (Potato Chips)
'lays classic salted chips 24g',
'lays magic masala chips 24g',
'lays cream & onion chips 24g',
'lays tomato tango chips 24g',

'lays classic salted chips 28g',
'lays magic masala chips 28g',
'lays cream & onion chips 28g',
'lays tomato tango chips 28g',
'lays american style cream & onion 28g',

'lays classic salted chips 40g',
'lays magic masala chips 40g',
'lays cream & onion chips 40g',
'lays tomato tango chips 40g',
'lays american style cream & onion 40g',

'lays classic salted chips 90g',
'lays magic masala chips 90g',
'lays cream & onion chips 90g',
'lays tomato tango chips 90g',
'lays american style cream & onion 90g',

'lays classic salted chips 143 & 190g',
'lays magic masala chips 143 & 190g',
'lays cream & onion chips 143 & 190g',
'lays tomato tango chips 143 & 190g',
'lays american style cream & onion 143 & 190g',
// Uncle Chips
'uncle chips spicy treat 60g',
'uncle chips plain salted 60g',
// Bingo (ITC)
'bingo mad angles achari masti 70g',
'bingo mad angles cheese nachos 70g',
'bingo potato chips tomato flavor 55g',
// Kurkure
'kurkure masala munch 55g',
'kurkure masala munch 36g',
'kurkure naughty tomato 36g',
'kurkure green chilli 36g',
'kurkure solid masti twisty 36g',
'kurkure chilli chatka 36g',
'kurkure green chutney 55g',
'kurkure chilli chatka 55g',
'kurkure solid masti twisty 85g',
// Haldiram’s Namkeen & Chips
'haldirams aloo bhujia 200g',
'haldirams navratan mix 200g',
'haldirams classic salted chips 70g',
'haldirams moong dal 200g',

// Balaji Wafers
'balaji potato chips masala 50g',
'balaji tomato chips 50g',
'balaji banana chips 80g'
    ];

    const normalize = str => str.toLowerCase().replace(/[’'`]/g, "'").replace(/\s+/g, ' ').trim();
    const searchInput = document.getElementById('searchInput');

    // ✅ Use parent wrapper as container
    const inputWrapper = searchInput.parentNode;

    const suggestionBox = document.createElement('div');
    suggestionBox.classList.add('search-suggestions');
    suggestionBox.style.position = 'absolute';
    suggestionBox.style.background = 'black';
    suggestionBox.style.border = '1px solid #555';
    suggestionBox.style.bordercolor = 'red';
    suggestionBox.style.borderRadius = '14px';
    suggestionBox.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.6)';
    suggestionBox.style.zIndex = '1000';
    suggestionBox.style.maxHeight = '200px';
    suggestionBox.style.overflowY = 'auto';
    suggestionBox.style.display = 'none';
    suggestionBox.style.width = '820px'; 
    suggestionBox.style.color = 'red';
    suggestionBox.style.fontFamily = 'Segoe UI, sans-serif';
    suggestionBox.style.top = '420px';
    suggestionBox.style.left = '265px';  

    inputWrapper.appendChild(suggestionBox);

    function showSuggestions(filteredList) {
        suggestionBox.innerHTML = '';
        if (filteredList.length === 0) {
            suggestionBox.style.display = 'none';
            return;
        }

        filteredList.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            div.style.padding = '10px';
            div.style.cursor = 'pointer';
            div.style.borderBottom = '1px solid #222';
            div.addEventListener('click', () => {
                searchInput.value = item;
                suggestionBox.style.display = 'none';
                searchProduct(item);
            });
            suggestionBox.appendChild(div);
        });

        suggestionBox.style.display = 'block';
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const inputValue = normalize(searchInput.value);
            const matches = productList.filter(p => normalize(p).includes(inputValue));
            showSuggestions(matches);
        });

        document.addEventListener('click', function (e) {
            if (!suggestionBox.contains(e.target) && e.target !== searchInput) {
                suggestionBox.style.display = 'none';
            }
        });
    }
});