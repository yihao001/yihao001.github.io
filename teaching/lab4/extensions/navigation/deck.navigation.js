/*!
Deck JS - deck.navigation
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
*/
!function(e,n){var i=e(document),t=function(i,t,c){var d=e.deck("getOptions"),a=e.deck("getSlides").length-1,l=e.deck("getSlide",c-1),s=e.deck("getSlide",c+1),k=window.location.href.replace(/#.*/,""),r=l?l.attr("id"):n,o=s?s.attr("id"):n,u=e(d.selectors.previousLink),v=e(d.selectors.nextLink);u.toggleClass(d.classes.navDisabled,0===c),u.attr("aria-disabled",0===c),u.attr("href",k+"#"+(r||"")),v.toggleClass(d.classes.navDisabled,c===a),v.attr("aria-disabled",c===a),v.attr("href",k+"#"+(o||""))};e.extend(!0,e.deck.defaults,{classes:{navDisabled:"deck-nav-disabled"},selectors:{nextLink:".deck-next-link",previousLink:".deck-prev-link"}}),i.bind("deck.init",function(){var n,i=e.deck("getOptions"),c=e.deck("getSlides"),d=e.deck("getSlide"),a=e(i.selectors.previousLink),l=e(i.selectors.nextLink);a.unbind("click.decknavigation"),a.bind("click.decknavigation",function(n){e.deck("prev"),n.preventDefault()}),l.unbind("click.decknavigation"),l.bind("click.decknavigation",function(n){e.deck("next"),n.preventDefault()}),e.each(c,function(e,i){if(i===d)return n=e,!1}),t(null,n,n)}),i.bind("deck.change",t)}(jQuery);