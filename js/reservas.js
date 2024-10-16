$(document).ready(function() {
	loadReservations();

	$('#reservationForm').submit(function(event) {
		event.preventDefault();
		const id = $('#reservationId').val();
		if (id) {
			updateReservation(id);
		} else {
			addReservation();
		}
	});
});

function loadReservations() {
	$.getJSON('/api/reservations', function(data) {
		$('#reservationTableBody').empty();
		data.forEach(reservation => {
			$('#reservationTableBody').append(
				`<tr>
					<td>${reservation.id}</td>
                    <td>${reservation.guest.name}</td>
                    <td>${reservation.room.number}</td>
                    <td>${reservation.checkIn}</td>
                    <td>${reservation.checkOut}</td>
                    <td>
                    	<button class="btn btn-sm btn-warning" onclick="showEditReservationForm(${reservation.id}, '${reservation.guest.id}', '${reservation.room.id}', '${reservation.checkIn}', '${reservation.checkOut}')">Edit</button>
                    	<button class="btn btn-sm btn-danger" onclick="deleteReservation(${reservation.id})">Delete</button>
                    </td>
                </tr>`
			);
		});
	});
}

function showAddReservationForm() {
	$('#formTitle').text('Add Reserva');
	$('#reservationId').val('');
	$('#reservationGuest').val('');
	$('#reservationRoom').val('');
	$('#reservationCheckIn').val('');
	$('#reservationCheckOut').val('');
	$('#reservationFormModal').show();
}

function showEditReservationForm(id, guestId, roomId, checkIn, checkOut) {
	$('#formTitle').text('Edit Reserva');
	$('#reservationId').val(id);
	$('#reservationGuest').val(guestId);
	$('#reservationRoom').val(roomId);
	$('#reservationCheckIn').val(checkIn);
	$('#reservationCheckOut').val(checkOut);
	$('#reservationFormModal').show();
}

function closeReservationForm() {
	$('#reservationFormModal').hide();
}

function addReservation() {
	const reservation = {
		guest: { id: $('#reservationGuest').val() },
		room: { id: $('#reservationRoom').val() },
		checkIn: $('#reservationCheckIn').val(),
		checkOut: $('#reservationCheckOut').val()
	};
	$.ajax({
		url: '/api/reservations',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(reservation),
		success: function() {
			closeReservationForm();
			loadReservations();
		}
	});
}

function updateReservation(id) {
	const reservation = {
		guest: { id: $('#reservationGuest').val() },
		room: { id: $('#reservationRoom').val() },
		checkIn: $('#reservationCheckIn').val(),
		checkOut: $('#reservationCheckOut').val()
	};
	$.ajax({
		url: `/api/reservations/${id}`,
		type: 'PUT',
		contentType: 'application/json',
		data: JSON.stringify(reservation),
		success: function() {
			closeReservationForm();
			loadReservations();
		}
	});
}

function deleteReservation(id) {
	if (confirm('Realmente deseja deletar a reserva?')) {
		$.ajax({
			url: `/api/reservations/${id}`,
			type: 'DELETE',
			success: function() {
				loadReservations();
			}
		});
	}
}
