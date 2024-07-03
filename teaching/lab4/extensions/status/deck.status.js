/*!
Deck JS - deck.status
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
*/
!function(t){var e,s=t(document),n=function(e,s,n){var c=t.deck("getOptions"),a=n+1;c.countNested||(a=t.deck("getSlide",n).data("rootSlide")),t(c.selectors.statusCurrent).text(a)},c=function(){var s=t.deck("getOptions"),n=t.map([s.classes.before,s.classes.previous,s.classes.current,s.classes.next,s.classes.after],function(t){return"."+t}).join(", ");e=0,t.each(t.deck("getSlides"),function(t,c){var a=c.parentsUntil(s.selectors.container,n);a.length?c.data("rootSlide",a.last().data("rootSlide")):(++e,c.data("rootSlide",e))})},a=function(){var e,s=t.deck("getSlides"),c=t.deck("getSlide");t.each(s,function(t,s){if(s===c)return e=t,!1}),n(null,e,e)},o=function(){var s=t.deck("getOptions"),n=t.deck("getSlides");s.countNested?t(s.selectors.statusTotal).text(n.length):t(s.selectors.statusTotal).text(e)};t.extend(!0,t.deck.defaults,{selectors:{statusCurrent:".deck-status-current",statusTotal:".deck-status-total"},countNested:!0}),s.bind("deck.init",function(){c(),a(),o()}),s.bind("deck.change",n)}(jQuery);