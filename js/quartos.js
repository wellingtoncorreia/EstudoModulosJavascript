
$(document).ready(function() {
	loadRooms();

	$('#roomForm').submit(function(event) {
		event.preventDefault();
		const id = $('#roomId').val();
		if (id) {
			updateRoom(id);
		} else {
			addRoom();
		}
	});
});

function loadRooms() {
	$.getJSON('/api/rooms', function(data) {
		$('#roomTableBody').empty();
		data.forEach(room => {
			$('#roomTableBody').append(
				`<tr>
						<td>${room.id}</td>
                        <td>${room.number}</td>
                            <td>${room.type}</td>
                            <td>
                                <button class="btn btn-sm btn-warning" onclick="loadRoomForEdit(${room.id})">Edit</button>
                                <button class="btn btn-sm btn-danger" onclick="deleteRoom(${room.id})">Delete</button>
                            </td>
                 </tr>`
			);
		});
	});
}

function showAddRoomForm() {
	$('#formTitle').text('Add Room');
	$('#roomId').val('');
	$('#roomNumber').val('');
	$('#roomType').val('');
	$('#roomFormModal').show();
}

function loadRoomForEdit(id) {
	$.getJSON(`/api/rooms/${id}`, function(room) {
		showEditRoomForm(room.id, room.number, room.type);
	});
}

function showEditRoomForm(id, number, type) {
	$('#formTitle').text('Edit Room');
	$('#roomId').val(id);
	$('#roomNumber').val(number);
	$('#roomType').val(type);
	$('#roomFormModal').show();
}

function closeRoomForm() {
	$('#roomFormModal').hide();
}

function addRoom() {
	const room = {
		number: $('#roomNumber').val(),
		type: $('#roomType').val()
	};
	$.ajax({
		url: '/api/rooms',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(room),
		success: function() {
			closeRoomForm();
			loadRooms();
		}
	});
}

function updateRoom(id) {
	const room = {
		number: $('#roomNumber').val(),
		type: $('#roomType').val()
	};
	$.ajax({
		url: `/api/rooms/${id}`,
		type: 'PUT',
		contentType: 'application/json',
		data: JSON.stringify(room),
		success: function() {
			closeRoomForm();
			loadRooms();
		}
	});
}

function deleteRoom(id) {
	if (confirm('Deseja deletar o quarto?')) {
		$.ajax({
			url: `/api/rooms/${id}`,
			type: 'DELETE',
			success: function() {
				loadRooms();
			}
		});
	}
}
