var API_BASE_URL = "http(s)://gateway.marvel.com/";
var USERNAME = "wingilot";
var PASSWORD = "1234";

$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

/*
Details about repository of Marvel API 
http(s)://gateway.marvel.com/
*/

$("#button_search").click(function(e) {
	e.preventDefault();
	getRepos();
});

function getRepo(character_name) {
	var url = API_BASE_URL + '/V1/public/characters' + "?name=" + character_name + "?ts=1&apikey=d4d5b03eb4a1a41e1688ad195a57c8ef&hash=688cdfb67ebb3271577036ae3f4df614";
	$("#get_repo_result").text('');

	$.ajax({
		url : url,
		type : 'GET',

		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var repo = data;

				$("#get_repo_result").text('');
				$('<h4> Name: ' + results.name + '</h4>').appendTo($('#get_repo_result'));
				$('<p>').appendTo($('#get_repo_result'));	
				$('<strong> ID: </strong> ' + results.id + '<br>').appendTo($('#get_repo_result'));
				$('<strong> URL: </strong> ' + results.html_url + '<br>').appendTo($('#get_repo_result'));
				$('<strong> Description: </strong> ' + results.description + '<br>').appendTo($('#get_repo_result'));
				$('</p>').appendTo($('#get_repo_result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#get_repo_result"));
	});

}