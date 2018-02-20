var left_layout = {};

left_layout.init = function(container,items){
	SpimeEngine.DebugPrint("left layout init for " + items.length + " items and container: " + container.width() + " X " + container.height());
	//var originalFontSize = Math.round(parseInt(items.find(".preview-title").css("font-size")));
	//items.find(".preview-title").attr("data-orig-font-size",originalFontSize);
	items.each(function(){
		var previewContentHolder = $(this).find(".preview-content-holder");
		var originalMaxWidth = parseInt(previewContentHolder.css("max-width"));
		previewContentHolder.attr("data-orig-max-width", originalMaxWidth);
	});
};

left_layout.applyLayout = function(container,items,paramsFromRealTime){
	SpimeEngine.DebugPrint("left layout applyLayout for ");
	//TODO: width for flip should be set in the layout settings
	if (container.width() < 500){
		items.each(function(){
			left_layout.flipVertically($(this));
		});
	}else{
		items.each(function(){
			left_layout.unflip($(this));
		});
	}
	
	
	items.each(function(){
		var previewContentHolder = $(this).find(".preview-content-holder");
		var margins = parseInt(previewContentHolder.css("margin-left")) + parseInt(previewContentHolder.css("margin-right")) + parseInt(previewContentHolder.css("padding-left")) + parseInt(previewContentHolder.css("padding-right"));
		var previewContentWrapper = $(this).find(".item-content ");
		var maxWidthVal = (previewContentWrapper.width() / 2) - margins;
		var originalMaxWith = previewContentHolder.attr("data-orig-max-width");
		maxWidthVal = Math.min(maxWidthVal,originalMaxWith);
	//	previewContentHolder.css("max-width",maxWidthVal);		
	});
	

	items.each(function(idx){
		var currentItem = $(this);
		//var textElement = currentItem.find(".preview-title");
		//var contentHolder = currentItem.find(".preview-content-holder");
		var contentWrapper = currentItem.find(".preview-content-wrapper");
		//var originalFontSize = parseInt(textElement.attr("data-orig-font-size"));
		if (typeof currentItem.attr("data-flipped") != "undefined"){
			contentWrapper.removeClass("shrinker-parent");
			currentItem.find(".helper-div").addClass("shrinker-parent"); 
		}else{
			contentWrapper.addClass("shrinker-parent");
			currentItem.find(".helper-div").removeClass("shrinker-parent"); 
		}
//		textElement.css("font-size",originalFontSize);
//		if (contentHolder.outerWidth(true) > contentWrapper.width()){
//			var newFontSize =  SpimeEngine.shrinkTextToFit(originalFontSize,contentWrapper,contentHolder,textElement,0,30);
//			textElement.css("font-size",newFontSize);
//		}
	});	
};


left_layout.flipVertically = function(item){	
	if (typeof item.attr("data-flipped") == "undefined"){
		item.attr("data-flipped","true");
		var helperDiv = item.find(".helper-div");
		var itemPreview = helperDiv.children(".item-preview");
		var itemDetails = helperDiv.children(".item-details");
		var textWrapper = $("<div id='text-wrapper' />");
		var imageWrapper = $("<div id='image-wrapper' class='preview image-cover' />");
		textWrapper.append(itemDetails);
		imageWrapper.append(itemPreview);
		helperDiv.append(textWrapper);
		helperDiv.append(imageWrapper);
	}
};

left_layout.unflip = function(item){
	if (typeof item.attr("data-flipped") != "undefined"){
		item.removeAttr("data-flipped","true");
		var helperDiv = item.find(".helper-div");
		var itemPreview = helperDiv.find(".item-preview");
		var itemDetails = helperDiv.find(".item-details");
		itemPreview.unwrap();
		itemDetails.unwrap();
		itemPreview.before(itemDetails);
	}
};

