describe("Deck JS",function(){describe("standard html structure",function(){beforeEach(function(){loadFixtures("standard.html"),Modernizr.history?history.replaceState({},"","#"):window.location.hash="#"}),describe("init(options.selectors.slides)",function(){it("should create slides",function(){$.deck({selectors:{slides:".slide3"}}),expect($.deck("getSlides").length).toEqual($(".slide3").length)})}),describe("init(selector)",function(){it("should create slides",function(){$.deck(),expect($.deck("getSlides").length).toEqual($(".slide").length)})}),describe("init([selectors])",function(){it("should create slides",function(){$.deck([".slide1",".slide2",".slide3",".slide4",".slide5"]),expect($.deck("getSlides").length).toEqual($(".slide").length)})}),describe("navigation functions",function(){beforeEach(function(){$.deck()}),describe("go(i)",function(){it("should go to the i slide (0 based index)",function(){$.deck("go",3),expect($.deck("getSlide")).toHaveClass("slide4")}),it("should go to the slide with specified id",function(){$.deck("go","custom-id"),expect($.deck("getSlide")).toHaveId("custom-id")}),it("should go nowhere if i is out of bounds",function(){$.deck("go",5),expect($.deck("getSlide")).toHaveClass("slide1")}),it("should go nowhere if id does not exist",function(){$.deck("go","i-dont-exist"),expect($.deck("getSlide")).toHaveClass("slide1")}),describe("aria attribute updates",function(){beforeEach(function(){loadFixtures("nesteds.html"),$.deck(),$.deck("go",5)}),it("should set offscreen slides to hidden true",function(){$([".toplevel.deck-before:not(.deck-child-current)",".toplevel.deck-previous:not(.deck-child-current)",".deck-next",".deck-after"].join(", ")).each(function(){expect($(this)).toHaveAttr("aria-hidden","true")})}),it("should set onscreen slides to hidden false",function(){$([".deck-child-current.slide",".deck-child-current .deck-before",".deck-child-current .deck-previous",".deck-current"].join(", ")).each(function(){expect($(this)).toHaveAttr("aria-hidden","false")})})})}),describe("next()",function(){it("should go to the next slide",function(){$.deck("next"),expect($.deck("getSlide")).toHaveClass("slide2")}),it("should go nowhere if on the last slide",function(){$.deck("go",4),$.deck("next"),expect($.deck("getSlide")).toHaveClass("slide5")})}),describe("prev()",function(){it("should go to the previous slide",function(){$.deck("go",2),$.deck("prev"),expect($.deck("getSlide")).toHaveClass("slide2")}),it("should go nowhere if on the first slide",function(){$.deck("prev"),expect($.deck("getSlide")).toHaveClass("slide1")})})}),describe("getters",function(){beforeEach(function(){$.deck()}),describe("getSlide()",function(){it("should get the current slide",function(){expect($.deck("getSlide")).toHaveClass("slide1"),$.deck("go",2),expect($.deck("getSlide")).toHaveClass("slide3")})}),describe("getSlide(i)",function(){it("should get slide number i (0 based index)",function(){expect($.deck("getSlide",1)).toHaveClass("slide2"),expect($.deck("getSlide",3)).toHaveClass("slide4")}),it("should return null if i is NaN",function(){expect($.deck("getSlide","barfoo")).toBeNull()}),it("should return null if i is out of bounds",function(){expect($.deck("getSlide",6)).toBeNull()})}),describe("getSlides()",function(){it("should return an array of jQuery objects for each slide",function(){var e=[],t=$.deck("getSlides");$(".slide").each(function(){e.push($(this))}),expect(t).toEqual(e)})}),describe("getContainer()",function(){it("should return a jQuery object with the container element(s)",function(){expect($.deck("getContainer")).toBe(defaults.selectors.container)})}),describe("getOptions()",function(){it("should return the current options object",function(){expect($.deck("getOptions")).toEqual(defaults)})}),describe("getTopLevelSlides()",function(){it("should return only root slides",function(){loadFixtures("nesteds.html"),$.deck();var e=[],t=$.deck("getTopLevelSlides");$(".toplevel").each(function(){e.push($(this))}),expect(t).toEqual(e)})}),describe("getNestedSlides()",function(){it("should return nested slides for current slide",function(){loadFixtures("nesteds.html"),$.deck(),$.deck("go",2);var e=[],t=$.deck("getNestedSlides");$.deck("getSlide").find(".slide").each(function(){e.push($(this))}),expect(t).toEqual(e)})})}),describe("container states",function(){beforeEach(function(){$.deck()}),it("should start at state 0",function(){expect($(defaults.selectors.container)).toHaveClass(defaults.classes.onPrefix+"0")}),it("should change states with the slide number",function(){$.deck("next"),expect($(defaults.selectors.container)).toHaveClass(defaults.classes.onPrefix+"1"),$.deck("go",3),expect($(defaults.selectors.container)).toHaveClass(defaults.classes.onPrefix+"3"),$.deck("prev"),expect($(defaults.selectors.container)).toHaveClass(defaults.classes.onPrefix+"2")})}),describe("options object",function(){var e=$(document);beforeEach(function(){$.deck(".alt-slide",{classes:{after:"alt-after",before:"alt-before",current:"alt-current",onPrefix:"alt-on-",next:"alt-next",previous:"alt-prev"},selectors:{container:".alt-container"},keys:{next:87,previous:69}})}),describe("classes",function(){it("should use the specified after class",function(){expect($(".alt-slide3, .alt-slide4, .alt-slide5")).toHaveClass("alt-after")}),it("should use the specified before class",function(){$.deck("go",4),expect($(".alt-slide1, .alt-slide2, .alt-slide3")).toHaveClass("alt-before")}),it("should use the specified container class",function(){$.deck("go",2),expect($(".alt-container")).toHaveClass("alt-on-2")}),it("should use the specified current class",function(){expect($.deck("getSlide")).toHaveClass("alt-current")}),it("should use the specified next class",function(){expect($(".alt-slide2")).toHaveClass("alt-next")}),it("should use the specified previous class",function(){$.deck("next"),expect($(".alt-slide1")).toHaveClass("alt-prev")})}),describe("key bindings",function(){var t;beforeEach(function(){t=jQuery.Event("keydown.deck")}),it("should go to the next slide using the specified key",function(){t.which=87,e.trigger(t),expect($.deck("getSlide")).toHaveClass("alt-slide2")}),it("should go to the previous slide using the specified key",function(){$.deck("next"),t.which=69,e.trigger(t),expect($.deck("getSlide")).toHaveClass("alt-slide1")}),it("should not trigger events that originate within editable elements",function(){var e=$('<input type="text" />').appendTo("body");(t=jQuery.Event("keydown")).which=87,e.trigger(t),expect($.deck("getSlide")).toHaveClass("alt-slide1"),e.remove()})})}),describe("events",function(){var e;beforeEach(function(){e=$(document)}),describe("deck.change",function(){var t,i;beforeEach(function(){$.deck(),$.deck("go",1),e.one("deck.change",function(e,n,o){t=o,i=n})}),it("should fire on go(i)",function(){$.deck("go",3),expect(t).toEqual(3)}),it("should fire on next()",function(){$.deck("next"),expect(t).toEqual(2)}),it("should fire on prev()",function(){$.deck("prev"),expect(t).toEqual(0)}),it("should pass parameters with from and to indices",function(){$.deck("go",3),expect(t).toEqual(3),expect(i).toEqual(1)}),it("should not fire if default prevented in beforeChange",function(){e.bind("deck.beforeChange",!1),$.deck("go",3),expect($.deck("getSlide")).toEqual($.deck("getSlide",1)),e.unbind("deck.beforeChange",!1)})}),describe("deck.init",function(){it("should fire on deck initialization",function(){$.deck(),expect($.deck("getSlides").length).toBeGreaterThan(0)})}),describe("deck.beforeInit",function(){var t;beforeEach(function(){t=!1,e.on("deck.beforeInit",function(){t=!0})}),it("should fire on deck initialization",function(){$.deck(),expect(t).toBeTruthy()}),it("should have populated the slides array",function(){var t=function(){expect($.deck("getSlides").length).toEqual($(".slide").length)};e.bind("deck.beforeInit",t),$.deck(),e.unbind("deck.beforeInit",t)}),it("should prevent the init event if lockInit is called",function(){var t=!1,i=function(e){e.lockInit()},n=function(){t=!0};e.bind("deck.beforeInit",i),e.bind("deck.init",n),$.deck(),e.unbind("deck.beforeInit",i),e.unbind("deck.init",n),expect(t).toBeFalsy()}),it("should warn if locked without release",function(){var t=!1,i=function(e){e.lockInit()},n=console.warn;window.console.warn=function(){t=!0},e.bind("deck.beforeInit",i),$.deck(".slide",{initLockTimeout:20}),e.unbind("deck.beforeInit",i),waitsFor(function(){return t},"warning",2e3),runs(function(){window.console.warn=n})}),it("should fire init event once releaseInit is called",function(){var t=function(e){e.lockInit(),window.setTimeout(function(){e.releaseInit()},20)};runs(function(){e.bind("deck.beforeInit",t),$.deck(),e.unbind("deck.beforeInit",t)}),waitsFor(function(){return $.deck("getSlides").length>0},"lock to release",2e3)})})}),describe("hash/id assignments",function(){beforeEach(function(){$.deck(".slide")}),it("should assign ids to slides that do not have them",function(){var e=$.deck("getSlides");$.each(e,function(e,t){expect(t.attr("id")).toBeTruthy()})}),it("should reassign ids on reinitialization",function(){var e=$.deck("getSlide",0),t=e.attr("id");e.before('<div class="slide"></div>'),$.deck(".slide"),expect(e).not.toHaveId(t)}),it("should update container with a state class including the slide id",function(){var e=$.deck("getContainer"),t=defaults.classes.onPrefix;expect(e).toHaveClass(t+$.deck("getSlide",0).attr("id")),$.deck("next"),expect(e).toHaveClass(t+$.deck("getSlide",1).attr("id")),$.deck("next"),expect(e).not.toHaveClass(t+$.deck("getSlide",1).attr("id")),expect(e).toHaveClass(t+$.deck("getSlide",2).attr("id"))}),it("should use existing ids if they exist",function(){expect($("#custom-id")).toExist()}),it("should update the URL on slide change (if supported)",function(){Modernizr.history&&($.deck("go",3),expect(window.location.hash).toEqual("#slide-3"))}),it("should deep link to slide on deck init",function(){window.location.hash="#slide-3",$.deck(".slide"),waitsFor(function(){return"slide-3"===$.deck("getSlide").attr("id")})}),it("should follow internal hash links using hashchange (if supported)",function(){window.location.hash="#slide-3",waitsFor(function(){return"slide-3"===$.deck("getSlide").attr("id")},"hash to change to slide-3",2e3)})})}),describe("empty deck",function(){beforeEach(function(){loadFixtures("empty.html"),$.deck()}),describe("getSlide()",function(){it("should not error on init",$.noop)})})});