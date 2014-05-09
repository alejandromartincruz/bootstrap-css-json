var API_BASE_URL = "http://gateway.marvel.com";
var USERNAME = "wingilot";
var PASSWORD = "1234";
/*
$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

/*
Details about repository of GitHub API 
https://developer.github.com/v3/repos/
*/

$("#button_get_repos").click(function(e) {
	e.preventDefault();
	getRepos();
});

$("#button_get_repo").click(function(e) {
	e.preventDefault();
	getRepo($("#repository_name").val());
});

$("#button_get_repo_to_edit").click(function(e) {
	e.preventDefault();
	getRepoToEdit($("#repository_name_get_to_edit").val());
});


$("#button_edit_repo").click(function(e) {
	e.preventDefault();

    var newRepo = new Object();
	newRepo.name = $("#repository_name_to_edit").val()
	newRepo.description = $("#description_to_edit").val()
	
	updateRepo(newRepo);
});

$("#button_to_create").click(function(e) {
	e.preventDefault();

    var newRepo = new Object();
	newRepo.name = $("#repository_name_to_create").val();
	newRepo.description = $("#description_to_create").val();
 	newRepo.homepage = "https://github.com";
 	newRepo.private = false;
	newRepo.has_issues = true;
	newRepo.has_wiki = true;
	newRepo.has_downloads = true;

	createRepo(newRepo);
});




function getRepos() {
	var url = API_BASE_URL + '/v1/public/characters?' + '&ts=1&apikey=d4d5b03eb4a1a41e1688ad195a57c8ef&hash=688cdfb67ebb3271577036ae3f4df614';
	$("#repos_result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var repos = data.data.results;
				
				$.each(repos, function(i, v) {
					var repo = v;

					$('<h4> Name: ' + repo.name + '</h4>').appendTo($('#repos_result'));
					$('<p>').appendTo($('#repos_result'));	
					$('<img width=125 height=125 src=' + repo.thumbnail.path+'.jpg>'+'</img>').appendTo($('#repos_result'));
					$('<strong> URL: </strong> ' + repo.html_url + '<br>').appendTo($('#repos_result'));
					$('<strong> Description: </strong> ' + repo.description + '<br>').appendTo($('#repos_result'));
					$('</p>').appendTo($('#repos_result'));
				});
				

	}).fail(function() {
		$("#repos_result").text("No data to show to you.");
	});

}

function getRepo(character_name) {
	var url = API_BASE_URL + '/v1/public/characters?name=' + character_name + '&ts=1&apikey=d4d5b03eb4a1a41e1688ad195a57c8ef&hash=688cdfb67ebb3271577036ae3f4df614';
	$("#get_repo_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var results = data.data.results[0];
				console.log(data);

				$("#get_repo_result").text('');
				$('<h4> Name: ' + results.name + '</h4>').appendTo($('#get_repo_result'));
				$('<h4> Description: ' + results.description + '</h4>').appendTo($('#get_repo_result'));
				$('<img width=125 height=125 src=' + results.thumbnail.path+'.jpg>'+'</img>').appendTo($('#get_repo_result'));
				$('</p>').appendTo($('#get_repo_result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Fuck!</strong> Character not found </div>').appendTo($("#get_repo_result"));
	});

}

function getRepoToEdit(repository_name) {
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository_name;
	$("#update_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
		
				var repo = data;
				

				$("#update_result").text('');
				$("#repository_name_to_edit").val(repo.name);
				$("#description_to_edit").val(repo.description);

	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#update_result"));
	});

}

function updateRepo(repository) {
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + repository.name;
	var data = JSON.stringify(repository);

	$("#update_result").text('');

	$.ajax({
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		data : data,
		statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#update_result"));}
    	}
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Updated</div>').appendTo($("#update_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#update_result"));
	});

}


function createRepo(repository) {
	var url = API_BASE_URL + '/user/repos';
	var data = JSON.stringify(repository);

	$("#create_result").text('');

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Created</div>').appendTo($("#create_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#create_result"));
	});

}

