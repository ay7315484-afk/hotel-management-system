// ======================================================
// HOTEL MANAGEMENT SYSTEM
// COMPLETE JAVASCRIPT
// ======================================================


// ======================================================
// GET MAIN ELEMENTS
// ======================================================

const signupTab = document.getElementById("signupTab");
const loginTab = document.getElementById("loginTab");

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

const dashboard = document.getElementById("dashboard");
const logoutBtn = document.getElementById("logoutBtn");


// ======================================================
// LOAD DATA FROM LOCAL STORAGE
// ======================================================

let guests =
    JSON.parse(localStorage.getItem("hotelGuests")) || [];

let roomsData =
    JSON.parse(localStorage.getItem("hotelRooms")) || [];

let bookingsData =
    JSON.parse(localStorage.getItem("hotelBookings")) || [];


// ======================================================
// SIGNUP / LOGIN TAB
// ======================================================

signupTab.addEventListener("click", function () {

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

});


loginTab.addEventListener("click", function () {

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");

});


// ======================================================
// SIGNUP
// ======================================================

signupForm.querySelector("form").addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const fullname =
            document.getElementById("fullname").value.trim();

        const hotelName =
            document.getElementById("hotelName").value.trim();

        const rooms =
            document.getElementById("rooms").value;

        const mobile =
            document.getElementById("mobile").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        // Check empty fields

        if (
            fullname === "" ||
            hotelName === "" ||
            rooms === "" ||
            mobile === "" ||
            email === "" ||
            password === ""
        ) {

            alert("Please fill all fields.");

            return;
        }


        // Create user

        const user = {

            fullname: fullname,

            hotelName: hotelName,

            rooms: Number(rooms),

            mobile: mobile,

            email: email,

            password: password

        };


        // Save user

        localStorage.setItem(
            "hotelUser",
            JSON.stringify(user)
        );


        alert("Registration Successful!");


        // Reset form

        signupForm.querySelector("form").reset();


        // Open login

        loginTab.click();

    }
);


// ======================================================
// LOGIN
// ======================================================

loginForm.querySelector("form").addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const loginEmail =
            document.getElementById("loginEmail")
            .value
            .trim();

        const loginPassword =
            document.getElementById("loginPassword")
            .value;


        // Get user

        const savedUser =
            localStorage.getItem("hotelUser");


        if (savedUser === null) {

            alert("Please register first.");

            return;
        }


        const user =
            JSON.parse(savedUser);


        // Check login

        if (
            loginEmail === user.email &&
            loginPassword === user.password
        ) {

            alert(
                "Login Successful! Welcome " +
                user.fullname
            );


            // Hide main page

            document.querySelector("header")
                .style.display = "none";

            document.querySelector(".container")
                .style.display = "none";

            document.querySelector(".project-title")
                .style.display = "none";


            // Show dashboard

            dashboard.classList.remove("hidden");


            // Welcome user

            document.getElementById("welcomeUser")
                .textContent =
                "Welcome, " + user.fullname;


            // Update dashboard

            updateRoomDashboard();


            // Display existing data

            displayGuests();

            displayRooms();

            displayBookings();

        }

        else {

            alert(
                "Invalid Email or Password."
            );

        }

    }
);


// ======================================================
// LOGOUT
// ======================================================

logoutBtn.addEventListener("click", function () {

    dashboard.classList.add("hidden");


    document.querySelector("header")
        .style.display = "flex";


    document.querySelector(".container")
        .style.display = "grid";


    document.querySelector(".project-title")
        .style.display = "block";


    document.getElementById("loginPassword")
        .value = "";


    loginTab.click();

});


// ======================================================
// GUEST MANAGEMENT
// ======================================================

const guestBtn =
    document.getElementById("guestBtn");

const guestManagement =
    document.getElementById("guestManagement");

const addGuestBtn =
    document.getElementById("addGuestBtn");

const guestFormContainer =
    document.getElementById("guestFormContainer");

const guestForm =
    document.getElementById("guestForm");

const guestTableBody =
    document.getElementById("guestTableBody");


// Open Guest Management

guestBtn.addEventListener("click", function () {

    guestManagement.classList.toggle("hidden");


    // Hide other sections

    document.getElementById("bookingManagement")
        .classList.add("hidden");

    document.getElementById("roomManagement")
        .classList.add("hidden");


    displayGuests();

});


// Add Guest Button

addGuestBtn.addEventListener("click", function () {

    guestFormContainer.classList.toggle("hidden");

});


// Add Guest

guestForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const guestName =
        document.getElementById("guestName")
        .value
        .trim();

    const guestMobile =
        document.getElementById("guestMobile")
        .value
        .trim();

    const guestEmail =
        document.getElementById("guestEmail")
        .value
        .trim();

    const guestRoom =
        document.getElementById("guestRoom")
        .value
        .trim();


    const guest = {

        id: Date.now(),

        name: guestName,

        mobile: guestMobile,

        email: guestEmail,

        room: guestRoom

    };


    guests.push(guest);


    localStorage.setItem(
        "hotelGuests",
        JSON.stringify(guests)
    );


    alert(
        "Guest Added Successfully!"
    );


    guestForm.reset();

    guestFormContainer.classList.add("hidden");

    displayGuests();

});


// Display Guests

function displayGuests() {

    guestTableBody.innerHTML = "";


    if (guests.length === 0) {

        guestTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No guests added yet.
                </td>
            </tr>
        `;

        return;
    }


    guests.forEach(function (guest) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${guest.name}
            </td>

            <td>
                ${guest.mobile}
            </td>

            <td>
                ${guest.email}
            </td>

            <td>
                Room ${guest.room}
            </td>

            <td>

                <button
                    class="delete-guest-btn"
                    onclick="deleteGuest(${guest.id})">

                    Delete

                </button>

            </td>

        `;


        guestTableBody.appendChild(row);

    });

}


// Delete Guest

function deleteGuest(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this guest?"
        );


    if (!confirmDelete) {

        return;
    }


    guests =
        guests.filter(function (guest) {

            return guest.id !== id;

        });


    localStorage.setItem(
        "hotelGuests",
        JSON.stringify(guests)
    );


    displayGuests();

}


// ======================================================
// ROOM MANAGEMENT
// ======================================================

const roomBtn =
    document.getElementById("roomBtn");

const roomManagement =
    document.getElementById("roomManagement");

const addRoomBtn =
    document.getElementById("addRoomBtn");

const roomFormContainer =
    document.getElementById("roomFormContainer");

const roomForm =
    document.getElementById("roomForm");

const roomTableBody =
    document.getElementById("roomTableBody");


// Open Room Management

roomBtn.addEventListener("click", function () {

    roomManagement.classList.toggle("hidden");


    // Hide other sections

    guestManagement.classList.add("hidden");

    document.getElementById("bookingManagement")
        .classList.add("hidden");


    displayRooms();

});


// Add Room Button

addRoomBtn.addEventListener("click", function () {

    roomFormContainer.classList.toggle("hidden");

});


// Add Room

roomForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const roomNumber =
        document.getElementById("roomNumber")
        .value
        .trim();

    const roomType =
        document.getElementById("roomType")
        .value;

    const roomPrice =
        document.getElementById("roomPrice")
        .value;

    const roomStatus =
        document.getElementById("roomStatus")
        .value;


    // Check duplicate room

    const existingRoom =
        roomsData.find(function (room) {

            return String(room.number) ===
                String(roomNumber);

        });


    if (existingRoom) {

        alert(
            "This room number already exists."
        );

        return;
    }


    // Create room

    const room = {

        id: Date.now(),

        number: roomNumber,

        type: roomType,

        price: Number(roomPrice),

        status: roomStatus

    };


    roomsData.push(room);


    // Save room

    localStorage.setItem(
        "hotelRooms",
        JSON.stringify(roomsData)
    );


    alert(
        "Room Added Successfully!"
    );


    roomForm.reset();

    roomFormContainer.classList.add("hidden");


    displayRooms();

    updateRoomDashboard();

    loadBookingRooms();

});


// Display Rooms

function displayRooms() {

    roomTableBody.innerHTML = "";


    if (roomsData.length === 0) {

        roomTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No rooms added yet.
                </td>
            </tr>
        `;

        return;
    }


    roomsData.forEach(function (room) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                Room ${room.number}
            </td>

            <td>
                ${room.type}
            </td>

            <td>
                ₹${room.price}
            </td>

            <td>
                ${room.status}
            </td>

            <td>

                <button
                    class="delete-room-btn"
                    onclick="deleteRoom(${room.id})">

                    Delete

                </button>

            </td>

        `;


        roomTableBody.appendChild(row);

    });

}


// Delete Room

function deleteRoom(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this room?"
        );


    if (!confirmDelete) {

        return;
    }


    // Check if room is booked

    const room =
        roomsData.find(function (room) {

            return room.id === id;

        });


    if (room) {

        const bookingExists =
            bookingsData.some(function (booking) {

                return String(booking.room) ===
                    String(room.number);

            });


        if (bookingExists) {

            alert(
                "This room has an active booking. Cancel the booking first."
            );

            return;
        }

    }


    roomsData =
        roomsData.filter(function (room) {

            return room.id !== id;

        });


    localStorage.setItem(
        "hotelRooms",
        JSON.stringify(roomsData)
    );


    displayRooms();

    updateRoomDashboard();

    loadBookingRooms();

}


// ======================================================
// DASHBOARD ROOM COUNTS
// ======================================================

function updateRoomDashboard() {

    const total =
        roomsData.length;


    const occupied =
        roomsData.filter(function (room) {

            return room.status === "Occupied";

        }).length;


    const available =
        roomsData.filter(function (room) {

            return room.status === "Available";

        }).length;


    document.getElementById("totalRooms")
        .textContent = total;


    document.getElementById("occupiedRooms")
        .textContent = occupied;


    document.getElementById("availableRooms")
        .textContent = available;

}


// ======================================================
// BOOKING MANAGEMENT
// ======================================================

const bookingBtn =
    document.getElementById("bookingBtn");

const bookingManagement =
    document.getElementById("bookingManagement");

const addBookingBtn =
    document.getElementById("addBookingBtn");

const bookingFormContainer =
    document.getElementById("bookingFormContainer");

const bookingForm =
    document.getElementById("bookingForm");

const bookingTableBody =
    document.getElementById("bookingTableBody");

const bookingRoom =
    document.getElementById("bookingRoom");


// ======================================================
// OPEN BOOKING MANAGEMENT
// ======================================================

bookingBtn.addEventListener("click", function () {

    bookingManagement.classList.toggle("hidden");


    // Hide other sections

    guestManagement.classList.add("hidden");

    roomManagement.classList.add("hidden");


    // Load available rooms

    loadBookingRooms();


    // Display bookings

    displayBookings();

});


// ======================================================
// LOAD AVAILABLE ROOMS
// ======================================================

function loadBookingRooms() {

    bookingRoom.innerHTML = `
        <option value="">
            Select Available Room
        </option>
    `;


    const availableRooms =
        roomsData.filter(function (room) {

            return room.status === "Available";

        });


    if (availableRooms.length === 0) {

        const option =
            document.createElement("option");

        option.value = "";

        option.textContent =
            "No Available Rooms";

        bookingRoom.appendChild(option);

        return;
    }


    availableRooms.forEach(function (room) {

        const option =
            document.createElement("option");


        option.value =
            String(room.number);


        option.textContent =
            "Room " +
            room.number +
            " - " +
            room.type +
            " - ₹" +
            room.price;


        bookingRoom.appendChild(option);

    });

}


// ======================================================
// ADD BOOKING BUTTON
// ======================================================

addBookingBtn.addEventListener("click", function () {

    // Refresh available rooms

    loadBookingRooms();


    bookingFormContainer.classList.toggle(
        "hidden"
    );

});


// ======================================================
// ADD BOOKING
// ======================================================

bookingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const guest =
            document.getElementById("bookingGuest")
            .value
            .trim();


        const mobile =
            document.getElementById("bookingMobile")
            .value
            .trim();


        const roomNumber =
            document.getElementById("bookingRoom")
            .value;


        const checkIn =
            document.getElementById("checkIn")
            .value;


        const checkOut =
            document.getElementById("checkOut")
            .value;


        // ------------------------------------------
        // VALIDATION
        // ------------------------------------------

        if (
            guest === "" ||
            mobile === "" ||
            roomNumber === "" ||
            checkIn === "" ||
            checkOut === ""
        ) {

            alert(
                "Please fill all booking fields."
            );

            return;
        }


        // ------------------------------------------
        // DATE VALIDATION
        // ------------------------------------------

        if (checkOut <= checkIn) {

            alert(
                "Check-out date must be after check-in date."
            );

            return;
        }


        // ------------------------------------------
        // FIND ROOM
        // ------------------------------------------

        const room =
            roomsData.find(function (room) {

                return String(room.number) ===
                    String(roomNumber);

            });


        if (!room) {

            alert(
                "Selected room does not exist."
            );

            return;
        }


        // ------------------------------------------
        // CHECK ROOM STATUS
        // ------------------------------------------

        if (room.status !== "Available") {

            alert(
                "This room is not available."
            );

            loadBookingRooms();

            return;
        }


        // ------------------------------------------
        // CREATE BOOKING
        // ------------------------------------------

        const booking = {

            id: Date.now(),

            guest: guest,

            mobile: mobile,

            room: String(roomNumber),

            checkIn: checkIn,

            checkOut: checkOut

        };


        // ------------------------------------------
        // SAVE BOOKING
        // ------------------------------------------

        bookingsData.push(booking);


        localStorage.setItem(
            "hotelBookings",
            JSON.stringify(bookingsData)
        );


        // ------------------------------------------
        // MAKE ROOM OCCUPIED
        // ------------------------------------------

        room.status = "Occupied";


        localStorage.setItem(
            "hotelRooms",
            JSON.stringify(roomsData)
        );


        // ------------------------------------------
        // SUCCESS
        // ------------------------------------------

        alert(
            "Booking Confirmed Successfully!"
        );


        // Reset form

        bookingForm.reset();


        // Hide form

        bookingFormContainer.classList.add(
            "hidden"
        );


        // Update all sections

        displayBookings();

        displayRooms();

        updateRoomDashboard();

        loadBookingRooms();

    }
);


// ======================================================
// DISPLAY BOOKINGS
// ======================================================

function displayBookings() {

    bookingTableBody.innerHTML = "";


    if (bookingsData.length === 0) {

        bookingTableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No bookings found.
                </td>
            </tr>
        `;

        return;
    }


    bookingsData.forEach(function (booking) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${booking.guest}
            </td>

            <td>
                ${booking.mobile}
            </td>

            <td>
                Room ${booking.room}
            </td>

            <td>
                ${booking.checkIn}
            </td>

            <td>
                ${booking.checkOut}
            </td>

            <td>

                <button
                    class="delete-room-btn"
                    onclick="deleteBooking(${booking.id})">

                    Cancel

                </button>

            </td>

        `;


        bookingTableBody.appendChild(row);

    });

}


// ======================================================
// CANCEL BOOKING
// ======================================================

function deleteBooking(id) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this booking?"
        );


    if (!confirmCancel) {

        return;
    }


    // Find booking

    const booking =
        bookingsData.find(function (booking) {

            return booking.id === id;

        });


    if (!booking) {

        alert("Booking not found.");

        return;
    }


    // Find room

    const room =
        roomsData.find(function (room) {

            return String(room.number) ===
                String(booking.room);

        });


    // Make room available

    if (room) {

        room.status = "Available";

    }


    // Remove booking

    bookingsData =
        bookingsData.filter(function (booking) {

            return booking.id !== id;

        });


    // Save bookings

    localStorage.setItem(
        "hotelBookings",
        JSON.stringify(bookingsData)
    );


    // Save rooms

    localStorage.setItem(
        "hotelRooms",
        JSON.stringify(roomsData)
    );


    alert(
        "Booking Cancelled Successfully!"
    );


    // Update everything

    displayBookings();

    displayRooms();

    updateRoomDashboard();

    loadBookingRooms();

}


// ======================================================
// INITIAL LOAD
// ======================================================

displayGuests();

displayRooms();

displayBookings();

updateRoomDashboard();