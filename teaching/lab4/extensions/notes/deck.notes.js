/*!
Deck JS - deck.notes
Copyright (c) 2011 Remi BARRAQUAND
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/
!function(e,n){var t=e(document);e.extend(!0,e[n].defaults,{classes:{notes:"deck-notes",notesContainer:"deck-notes-container"},keys:{notes:78},selectors:{}}),e[n]("extend","showNotes",function(){e("."+e[n]("getOptions").classes.notes).show()}),e[n]("extend","hideNotes",function(){e("."+e[n]("getOptions").classes.notes).hide()}),e[n]("extend","toggleNotes",function(){e("."+e[n]("getOptions").classes.notes).is(":visible")?e[n]("hideNotes"):e[n]("showNotes")}),t.bind("deck.init",function(){var s=e[n]("getOptions");e[n]("getContainer");t.unbind("keydown.decknotes").bind("keydown.decknotes",function(t){(t.which===s.keys.notes||e.inArray(t.which,s.keys.notes)>-1)&&(e[n]("toggleNotes"),t.preventDefault())})}).bind("deck.change",function(t,s,o){var i=e[n]("getSlide",o);i.children(".notes").length>0?e("."+e[n]("getOptions").classes.notesContainer).html(i.find(".notes").html()):e("."+e[n]("getOptions").classes.notesContainer).html("")})}(jQuery,"deck");