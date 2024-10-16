
$(document).ready(function() {
	loadGuests();

	$('#guestForm').submit(function(event) {
		event.preventDefault();
		const id = $('#guestId').val();
		if (id) {
			updateGuest(id);
		} else {
			addGuest();
		}
	});
});

function loadGuests() {
	$.getJSON('/api/guests', function(data) {
		$('#guestTableBody').empty();
		data.forEach(guest => {
			$('#guestTableBody').append(
				`<tr>
					<td>${guest.id}</td>
                    <td>${guest.name}</td>
                    <td>${guest.email}</td>
                    <td>
                    	<button class="btn btn-sm btn-warning" onclick="showEditGuestForm(${guest.id}, '${guest.name}', '${guest.email}')">Edit</button>
                    	<button class="btn btn-sm btn-danger" onclick="deleteGuest(${guest.id})">Delete</button>
                    </td>
                 </tr>`
			);
		});
	});
}

function showAddGuestForm() {
	$('#formTitle').text('Add hospede');
	$('#guestId').val('');
	$('#guestName').val('');
	$('#guestEmail').val('');
	$('#guestFormModal').show();
}

function showEditGuestForm(id, name, email) {
	$('#formTitle').text('Edit Hospede');
	$('#guestId').val(id);
	$('#guestName').val(name);
	$('#guestEmail').val(email);
	$('#guestFormModal').show();
}

function closeGuestForm() {
	$('#guestFormModal').hide();
}

function addGuest() {
	const guest = {
		name: $('#guestName').val(),
		email: $('#guestEmail').val()
	};
	$.ajax({
		url: '/api/guests',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(guest),
		success: function() {
			closeGuestForm();
			loadGuests();
		}
	});

}

function updateGuest(id) {
	const guest = {
		name: $('#guestName').val(),
		email: $('#guestEmail').val()
	};
	$.ajax({
		url: `/api/guests/${id}`,
		type: 'PUT',
		contentType: 'application/json',
		data: JSON.stringify(guest),
		success: function() {
			closeGuestForm();
			loadGuests();
		}
	});
}

function deleteGuest(id) {
	if (confirm('Realmente vai deletar?')) {
		$.ajax({
			url: `/api/guests/${id}`,
			type: 'DELETE',
			success: function() {
				loadGuests();
			}
		});
	}
}
