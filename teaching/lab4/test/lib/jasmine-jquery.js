var readFixtures=function(){return jasmine.getFixtures().proxyCallTo_("read",arguments)},preloadFixtures=function(){jasmine.getFixtures().proxyCallTo_("preload",arguments)},loadFixtures=function(){jasmine.getFixtures().proxyCallTo_("load",arguments)},setFixtures=function(t){jasmine.getFixtures().set(t)},sandbox=function(t){return jasmine.getFixtures().sandbox(t)},spyOnEvent=function(t,e){jasmine.JQuery.events.spyOn(t,e)};jasmine.getFixtures=function(){return jasmine.currentFixtures_=jasmine.currentFixtures_||new jasmine.Fixtures},jasmine.Fixtures=function(){this.containerId="jasmine-fixtures",this.fixturesCache_={},this.fixturesPath="spec/javascripts/fixtures"},jasmine.Fixtures.prototype.set=function(t){this.cleanUp(),this.createContainer_(t)},jasmine.Fixtures.prototype.preload=function(){this.read.apply(this,arguments)},jasmine.Fixtures.prototype.load=function(){this.cleanUp(),this.createContainer_(this.read.apply(this,arguments))},jasmine.Fixtures.prototype.read=function(){for(var t=[],e=arguments,n=e.length,i=0;i<n;i++)t.push(this.getFixtureHtml_(e[i]));return t.join("")},jasmine.Fixtures.prototype.clearCache=function(){this.fixturesCache_={}},jasmine.Fixtures.prototype.cleanUp=function(){jQuery("#"+this.containerId).remove()},jasmine.Fixtures.prototype.sandbox=function(t){var e=t||{};return jQuery('<div id="sandbox" />').attr(e)},jasmine.Fixtures.prototype.createContainer_=function(t){var e;t instanceof jQuery?(e=jQuery('<div id="'+this.containerId+'" />')).html(t):e='<div id="'+this.containerId+'">'+t+"</div>",jQuery("body").append(e)},jasmine.Fixtures.prototype.getFixtureHtml_=function(t){return"undefined"==typeof this.fixturesCache_[t]&&this.loadFixtureIntoCache_(t),this.fixturesCache_[t]},jasmine.Fixtures.prototype.loadFixtureIntoCache_=function(t){var e=this,n=this.fixturesPath.match("/$")?this.fixturesPath+t:this.fixturesPath+"/"+t;jQuery.ajax({async:!1,cache:!1,dataType:"html",url:n,success:function(n){e.fixturesCache_[t]=n},error:function(t,e,i){throw Error("Fixture could not be loaded: "+n+" (status: "+e+", message: "+i.message+")")}})},jasmine.Fixtures.prototype.proxyCallTo_=function(t,e){return this[t].apply(this,e)},jasmine.JQuery=function(){},jasmine.JQuery.browserTagCaseIndependentHtml=function(t){return jQuery("<div/>").append(t).html()},jasmine.JQuery.elementToString=function(t){return jQuery("<div />").append(t.clone()).html()},jasmine.JQuery.matchersClass={},function(t){var e={spiedEvents:{},handlers:[]};t.events={spyOn:function(t,n){var i=function(i){e.spiedEvents[[t,n]]=i};jQuery(t).bind(n,i),e.handlers.push(i)},wasTriggered:function(t,n){return!!e.spiedEvents[[t,n]]},cleanUp:function(){e.spiedEvents={},e.handlers=[]}}}(jasmine.JQuery),function(){var t={toHaveClass:function(t){return this.actual.hasClass(t)},toBeVisible:function(){return this.actual.is(":visible")},toBeHidden:function(){return this.actual.is(":hidden")},toBeSelected:function(){return this.actual.is(":selected")},toBeChecked:function(){return this.actual.is(":checked")},toBeEmpty:function(){return this.actual.is(":empty")},toExist:function(){return this.actual.size()>0},toHaveAttr:function(t,n){return e(this.actual.attr(t),n)},toHaveId:function(t){return this.actual.attr("id")==t},toHaveHtml:function(t){return this.actual.html()==jasmine.JQuery.browserTagCaseIndependentHtml(t)},toHaveText:function(t){return t&&jQuery.isFunction(t.test)?t.test(this.actual.text()):this.actual.text()==t},toHaveValue:function(t){return this.actual.val()==t},toHaveData:function(t,n){return e(this.actual.data(t),n)},toBe:function(t){return this.actual.is(t)},toContain:function(t){return this.actual.find(t).size()>0},toBeDisabled:function(){return this.actual.is(":disabled")},toHandle:function(t){var e=this.actual.data("events");return e&&e[t].length>0},toHandleWith:function(t,e){var n,i=this.actual.data("events")[t];for(n=0;n<i.length;n++)if(i[n].handler==e)return!0;return!1}},e=function(t,e){return e===undefined?t!==undefined:t==e},n=function(e){var n=jasmine.Matchers.prototype[e];jasmine.JQuery.matchersClass[e]=function(){if(this.actual instanceof jQuery){var i=t[e].apply(this,arguments);return this.actual=jasmine.JQuery.elementToString(this.actual),i}return!!n&&n.apply(this,arguments)}};for(var i in t)n(i)}(),beforeEach(function(){this.addMatchers(jasmine.JQuery.matchersClass),this.addMatchers({toHaveBeenTriggeredOn:function(t){return this.message=function(){return["Expected event "+this.actual+" to have been triggered on"+t,"Expected event "+this.actual+" not to have been triggered on"+t]},jasmine.JQuery.events.wasTriggered(t,this.actual)}})}),afterEach(function(){jasmine.getFixtures().cleanUp(),jasmine.JQuery.events.cleanUp()});