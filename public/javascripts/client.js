	
	$('#my-tab-content').load('includes/home.html');

	function edit_profile() {
		$('#my-tab-content').load('includes/settings.html');
	} // edit_profile()

    function showContent(link) {

		var url = 'includes/home.html';

	    switch (link) {
	    	case 'home-link':
	    		url = 'includes/home.html';
	    		break;
	    	case 'profile-link':
	    		url = 'includes/profile.html';
	    		break;
	    	case 'events-link':
	    		url = 'includes/events.html';
	    		break;
	    	case 'activity-link':
	    		url = 'includes/activity.html';
	    		break;
	    	case 'notif-link':
	    		url = 'includes/notification.html';
	    		break;
	    	case 'settings-link':
	    		url = 'includes/settings.html';
	    		break;
	    	default:
				console.log('Default case triggered.');
	    		break;
	    }

	    $('#my-tab-content').load(url);

	} // showContent()

