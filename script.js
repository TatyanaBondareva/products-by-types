'use strict';
$(() => {
	function buildTemplate (server) {
		$.getJSON(server, function (data) {
			const itemsForSale = buildCategory(data, "Распродажа", 'sale');
			const itemsForPromo =  buildCategory(data, "Промо-акция", 'promo');
			const itemsForRecommended =  buildCategory(data, "Рекомендуемые товары", 'recommended');
			const tmpl = _.template($("#productTemplate")[0].innerHTML);
			getTemplate("#sale", itemsForSale, tmpl);
			getTemplate("#promo", itemsForPromo, tmpl);
			getTemplate("#recommended", itemsForRecommended, tmpl);
		})
		.then(() => {
			console.log("We are the champions, my friend!");
			$.fancybox.hideLoading();
		})
		.catch(() => {
			alert("ERROR! Please try again!");
		});
	}
	function buildCategory(data, title, type) {
		return {
			title: title,
			items: data.filter((product) => {
				if(product.type === type) {
					return product.type;
				}
			})
		}
	}
	function getTemplate(id, category, tmpl) {
		$(id)[0].innerHTML = tmpl({
			template: category
		});
	}
	$.fancybox.showLoading();
	setTimeout(buildTemplate, 3000, 'products.json');
});