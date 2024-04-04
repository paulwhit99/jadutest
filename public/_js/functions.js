$.fn.setUpContent = function(){
	"use strict";
	$(this).find(".tabs a").click(function(){
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		$("form").removeClass("active");
		$("#"+$(this).data("target")).addClass("active");
		return false;
	})
	$(this).find("a[rel=modal]").click(function(){
		if ($(this).data("action")=="modalClose"){
			modal.close();
		} else {
			modal.open($(this).attr("href"), $(this).data());
		}
		return false;
	});	
	$(this).find("[rel=alert]").click(function(){
		var message = $("<div>");
		$("<h2>", {html:$(this).data("title")}).appendTo(message);
		$("<p>", {html:$(this).data("message")}).appendTo(message);
		var bc = $("<div>", {class:"button-container"}).appendTo(message);
		$("<a>", {href:"#", html: "Close", class: "button", click:function(){modal.close(); return false;}}).appendTo(bc);		
		modal.showMessage(message);
		return false;
	})
	$(this).find(".forms form").on("submit", function(e){
		$.ajax({
	 		url: $(this).attr("action"),
			data: $( this ).serialize(),
			method: "POST"
	 	}).done(function(json, status, xhr) {
			var result = $("<div>", {class:"result"}).appendTo($("body"));
			if (json.result){
				$(result).addClass("success").append($("<div>").append($("<i>", {class: "fa-solid fa-check"})));
			} else {
				$(result).addClass("fail").append($("<div>").append($("<i>", {class: "fa-solid fa-xmark"})));
			}
			setTimeout(() => {
				$(result).remove();
			}, 1500, result);		
	 	})
		e.preventDefault();
		return false;
	})
};
$(document).ready(function() {
	$("body").setUpContent();
})
$(document).on('keyup', function(e) {
	if (e.key == "Escape"){
		if (modal.isOpen){
			modal.close();
		}
	}
	if (e.key == "Enter"){
		if (modal.isOpen){
			$(modal.container).find("[rel=confirmButton]").click();
			return false;
		}
	}
});
var modal = {
	container: false,
	isOpen: false,
	nextClass: "",	
	nextContent: "",
	ps: null,
	init: function(){
		"use strict";
		this.container = $("<div>", {ID: "modal", css: {class:"hidden", opacity:0}, "click": function (){modal.close();}}).appendTo($("body"));
		this.inner = $("<div>", {class: "inner", css: {display:"none", opacity:0}, "click": function(e){e.stopPropagation(); return true;}}).appendTo(this.container);
		this.content = $("<div>", {id: "content"}).appendTo(this.inner);
		this.closeButton = $("<a>", {class: "closeButton", href:"#", "click": function(){modal.close(); return false;}}).appendTo(this.inner);
		//this.ps = new PerfectScrollbar($(this.content)[0]);
	},
	open: function(href, data){
		"use strict";
		if (href.indexOf("?")==-1){
			href+="?modal=Y";
		} else {
			href+="&modal=Y";
		}
		$.ajax({
			url: href,
			method: "POST",
			data: data,
			context: this
		}).done(function(resp, status, xhr) {
			respondToHeaders(xhr);
			var nextClass = "";
			if (xhr.getResponseHeader('class')!==undefined){
				nextClass = xhr.getResponseHeader('class');
			}	
			if (resp===""){
				if (modal.isOpen === true){
					modal.close();
				}
			} else {
				this.showMessage(resp, nextClass);
			}
		});
		return false;
	},
	load: function(resp, xhr){
		"use strict";
		respondToHeaders(xhr);
		if (xhr!==undefined){
			if (xhr.getResponseHeader('class')!==undefined){
				this.nextClass = xhr.getResponseHeader('class');
			}
			if (xhr.getResponseHeader('doRedirect')){
				self.location.href=xhr.getResponseHeader('doRedirect');
			}			
		}
		if (resp===""){
			if (this.isOpen===true){modal.close();}
		} else {
			this.nextContent = resp;
		}
	},
	showMessage: function(message, nextClass){
		if (!nextClass){nextClass="";}
		this.nextClass=nextClass;
		if (message==""){
			this.close();
		} else {
			this.nextContent = message;
			this.showContent();
		}
	},	
	showContent: function(){
		if (this.container===false){this.init();}
		if (this.isOpen===true){				
			$(this.inner).fadeOut(200, function(){
				modal.isOpen = false;
				modal.showContent();
			});
		} else {
			$("body").css({overflow: "hidden"});
			this.isOpen = true;
			$(this.container).attr("class", this.nextClass);
			$(this.content).html(modal.nextContent);			
			$(this.container).removeClass("hidden");			
			$(this.container).animate({opacity: 1}, 300);
			$(this.inner).css({opacity: 0, display: "block"}).animate(
				{opacity: 1},
				{
					duration: 200, 
					easing: "linear",
					step: function(a){				
						$(this).css({transform : "scale("+((a + 1) / 2)+")"});
					},
					complete: function(){
						$(this).css({transform : "", opacity: "", borderSpacing: ""});
					}
				}
			);		
			$(this.content).scrollTop(0);				
			$(this.content).setUpContent();
			this.nextClass="";
			this.nextContent="";
		}
	},
	close: function(){
		"use strict";
		modal.isOpen = false;
		$("body").css({overflow: "auto"});
		$(this.container).animate(
			{opacity: 0},
			{
				duration: 200,
				easing: "linear",
				step: function(a){
					$(this).find(".inner").css({transform : "scale(" + ((a + 1) / 2) + ")"});
				},
				complete: function(){
					$(this).addClass("hidden");
					$(this).find(".inner").css({transform : ""});
				}
			}
		);
	}
};