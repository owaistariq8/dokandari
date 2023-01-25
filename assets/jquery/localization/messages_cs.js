(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: CS (Czech; čeština, český jazyk)
 */
$.extend( $.validator.messages, {
	required: "Tento údaj je povinný.",
	remote: "Prosím, opravte tento údaj.",
	email: "Prosím, zadejte platný e-mail.",
	url: "Prosím, zadejte platné URL.",
	date: "Prosím, zadejte platné datum.",
	dateISO: "Prosím, zadejte platné datum (ISO).",
	number: "Prosím, zadejte číslo.",
	digits: "Prosím, zadávejte pouze číslice.",
	creditcard: "Prosím, zadejte číslo kreditní karty.",
	equalTo: "Prosím, zadejte znovu stejnou hodnotu.",
	extension: "Prosím, zadejte soubor se správnou příponou.",
	maxlength: $.validator.format( "Prosím, zadejte nejvíce {0} znaků." ),
	minlength: $.validator.format( "Prosím, zadejte nejméně {0} znaků." ),
	rangelength: $.validator.format( "Prosím, zadejte od {0} do {1} znaků." ),
	range: $.validator.format( "Prosím, zadejte hodnotu od {0} do {1}." ),
	max: $.validator.format( "Prosím, zadejte hodnotu menší nebo rovnu {0}." ),
	min: $.validator.format( "Prosím, zadejte hodnotu větš�(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: CS (Czech; čeština, český jazyk)
 */
$.extend( $.validator.messages, {
	required: "Tento údaj je povinný.",
	remote: "Prosím, opravte tento údaj.",
	email: "Prosím, zadejte platný e-mail.",
	url: "Prosím, zadejte platné URL.",
	date: "Prosím, zadejte platné datum.",
	dateISO: "Prosím, zadejte platné datum (ISO).",
	number: "Prosím, zadejte číslo.",
	digits: "Prosím, zadávejte pouze číslice.",
	creditcard: "Prosím, zadejte číslo kreditní karty.",
	equalTo: "Prosím, zadejte znovu stejnou hodnotu.",
	extension: "Prosím, zadejte soubor se správnou příponou.",
	maxlength: $.validator.format( "Prosím, zadejte nejvíce {0} znaků." ),
	minlength: $.validator.format( "Prosím, zadejte nejméně {0} znaků." ),
	rangelength: $.validator.format( "Prosím, zadejte od {0} do {1} znaků." ),
	range: $.validator.format( "Prosím, zadejte hodnotu od {0} do {1}." ),
	max: $.validator.format( "Prosím, zadejte hodnotu menší nebo rovnu {0}." ),
	min: $.validator.format( "Prosím, zadejte hodnotu větší nebo rovnu {0}." ),
	step: $.validator.format( "Musí být násobkem čísla {0}." )
} );
return $;
}));