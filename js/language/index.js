

var demoJson = {
	"nav": {
		"service": {
			"en": "Service",
            "bn": "সার্ভিস"
		},
        "about": {
			"en": "About",
            "bn": "এবাউট"
		},
        "contact": {
			"en": "Contact",
            "bn": "কন্ট্যাক্ট "
		},
        "features": {
			"en": "Features",
            "bn": "ফিচারস"
		},
		
	},
    "auth":{
        "login": {
			"en": "Login",
            "bn": "লগইন"
		},
    },

    "heroContent":{
        "title": {
            "en": "Experience ",
            "bn": "এক্সপেরিয়েন্স "
        },
        "titleSpan1": {
            "en": "The",
            "bn": "দি"
        },
		"titleSpan2": {
            "en": "Most Advanced",
            "bn": "মোস্ট অ্যাডভান্সড"
        },
        "titleSpan3": {
            "en": "Bulk SMS Gateway",
            "bn": "বাল্ক এসএমএস গেটওয়ে"
        },
		"heroParagraph":{
			"en": "Make groups, import numbers and",
			"bn": "মেক গ্রুপস, ইম্পোর্ট নাম্বারস এন্ড"
		},
		"heroParagraphSpan":{
			"en": "send sms directly to every participant",
			"bn": "সেন্ড এসএমএস ডাইরেক্টলি টু এভরি পার্টিসিপেন্ট."
		},
    },

	"button":{
		"getStarted": {
            "en": "Get Started",
            "bn": "শুরু করুন"
        },
		"tryItOut":{
			"en": "Try It Out",
			"bn": "চেষ্টা করে দেখুন"
		}
	}
};

(function () {
	this.I18n = function (defaultLang) {
		var lang ;
		if(localStorage.getItem('ln')){
           lang = localStorage.getItem('ln')
		}
		else{
			lang = defaultLang || 'en';
		}

		this.language = lang;

		(function (i18n) {
			i18n.contents = demoJson;
			i18n.contents.prop = function (key) {
				var result = this;
				var keyArr = key.split('.');
				for (var index = 0; index < keyArr.length; index++) {
					var prop = keyArr[index];
					result = result[prop];
				}
				return result;
			};
			i18n.localize();
		})(this);
	};

	this.I18n.prototype.hasCachedContents = function () {
		return this.contents !== undefined;
	};

	this.I18n.prototype.lang = function (lang) {
		if (typeof lang === 'string') {
			this.language = lang;
			localStorage.setItem('ln', this.language)
		}
		this.localize();
		return this.language;
	};

	this.I18n.prototype.localize = function () {
		var contents = this.contents;
		if (!this.hasCachedContents()) {
			return;
		}
		var dfs = function (node, keys, results) {
			var isLeaf = function (node) {
				for (var prop in node) {
					if (node.hasOwnProperty(prop)) {
						if (typeof node[prop] === 'string') {
							return true;
						}
					}
				}
			}
			for (var prop in node) {
				if (node.hasOwnProperty(prop) && typeof node[prop] === 'object') {
					var myKey = keys.slice();
					myKey.push(prop);
					if (isLeaf(node[prop])) {
						//results.push(myKey.reduce((prev, current) => prev + '.' + current));	//not supported in older mobile broweser
						results.push(myKey.reduce( function (previousValue, currentValue, currentIndex, array) {
							return previousValue + '.' + currentValue;
						}));
					} else {
						dfs(node[prop], myKey, results);
					}
				}
			}
			return results;
		};
		var keys = dfs(contents, [], []);
		for (var index = 0; index < keys.length; index++) {
			var key = keys[index];
			if (contents.prop(key).hasOwnProperty(this.language)) {
				$('[data-i18n="'+key+'"]').text(contents.prop(key)[this.language]);
				$('[data-i18n-placeholder="'+key+'"]').attr('placeholder', contents.prop(key)[this.language]);
				$('[data-i18n-value="'+key+'"]').attr('value', contents.prop(key)[this.language]);
			} else {
				$('[data-i18n="'+key+'"]').text(contents.prop(key)['en']);
				$('[data-i18n-placeholder="'+key+'"]').attr('placeholder', contents.prop(key)['en']);
				$('[data-i18n-value="'+key+'"]').attr('value', contents.prop(key)['en']);
			}
		}
	};

}).apply(window);

$( document ).ready( function () {

	var i18n = new I18n();
	i18n.localize();
	$('.lang-picker #english').addClass('selected');

    $('.lang-picker #bengali').on('click', function () {
		i18n.lang('bn');
		selectLang($(this));
	})
	
	$('.lang-picker #portuguese').on('click', function () {
		i18n.lang('pt');
		selectLang($(this));
	})
	$('.lang-picker #english').on('click', function () {
		i18n.lang('en');
		selectLang($(this));
	})
	$('.lang-picker #spanish').on('click', function () {
		i18n.lang('es');
		selectLang($(this));
	})

	function selectLang (picker) {
		$('.lang-picker li').removeClass('selected');
		picker.addClass('selected');
	}

    $('#submitMessage').click(function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        console.log('SUBMIT CONTACT DETAILS CLICKED!');

        let name        = $('#name').val();
        let email       = $('#email').val();
        let phone       = $('#phone').val();
        let message     = $('.messageCont').val();


        console.log({name, phone, email, message});

        if (!name || !phone || !email || !message){
            Swal.fire({
                'icon': 'warning',
                title: 'Cannot Send',
                text: 'Please fill in all the fields before submitting.'
            })
            return false;
        }
  
        Swal.fire({
            'icon': 'success',
            title: 'Message Received',
            text: 'Thank you for your interest! We will be contacting you through your given phone very soon.'
        })
  
  
        let data = {
            subject: `From Edutech Landing Page: ${name}`,
            customHTML: `Phone: ${phone} || Email: ${email} || Message: ${message}`
        }
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    
        fetch('https://edutech-bd.xyz/send-email-corona', options)
            .then(data => data.json())
            .then(res => console.log(res))
            .catch(e => console.log(e));

        return false;
    });
});
