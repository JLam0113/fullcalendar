document.addEventListener('DOMContentLoaded', function() {

	var calendarEl = document.getElementById('calendar');
	var calendar = new FullCalendar.Calendar(calendarEl, {
		selectable: true,
		initialView: 'dayGridMonth',
		initialDate: '2017-11-01',
		headerToolbar: {
			left: 'title',
			right: 'prev,next today'
		},
		events:[
			{
				title:"Ride a Bike",
				description:"Today you get to ride a bicycle",
				date:1509652800000,
				tags:[
					"tag1",
					"tag3"
				]
			},
			{
				title:"Ride a BMW",
				description:"You get to decide which BMW you want to drive in the race course",
				date:1509748200000,
				tags:[
					"tag2"
				]
			},
			{
				title:"Fly a Plane",
				description:"Could you fly a plane?",
				date:1509985800000,
				tags:[
					"tag4"
				]
			},
			{
				title:"Drive the TTC Streetcar",
				description:"Have you ever want to try driving a TTC Streetcar?",
				date:1510864200000,
				tags:[
					"tag2",
					"tag4"
				]
			}
		],
	
		eventClick: function(info) {
			$('#modal_window').modal()
			$('#modal_event_title').html("Are you sure you want to select: '" + info.event.title + "' event?")
			$('#yesButton').click(function(){
				$('#modal_window').modal('hide')
				$('#title').html(info.event.title)
				$('#date').html(info.event.start)
				$('#description').html(info.event.extendedProps.description)
				$('#tags').html(info.event.extendedProps.tags.join(','))
			});
		},
	});

	calendar.render();
  
	$('#tags_selector').on('change',function(){
		calendar.batchRendering(function() {
			var tag = $('#tags_selector').val()
			if(tag != 'all'){
				let events = calendar.getEvents()
				for (let i = 0; i < events.length; i++) {
					let event = events[i]
					if (event.extendedProps.tags.indexOf(tag) <0) {
						event.setProp('display', 'none')
					}
					else 
						event.setProp('display', 'auto')
				}
			}
			else {
				let events = calendar.getEvents()
				for (let i = 0; i < events.length; i++) {
					events[i].setProp('display', 'auto')
				}
			}
		});
	});
});