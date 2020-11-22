const bookingData = [
    {
      "id": 1,
      "roomId": "A101",
      "startTime": "2019-09-28 13:00:00",
      "endTime": "2019-09-28 14:00:00",
      "title": "Lunch with Petr"
    },
    {
      "id": 2,
      "roomId": "A101",
      "startTime": "2019-09-28 14:00:00",
      "endTime": "2019-09-28 15:00:00",
      "title": "Sales Weekly Meeting"
    },
    {
      "id": 3,
      "roomId": "A101",
      "startTime": "2019-09-28 16:00:00",
      "endTime": "2019-09-28 18:00:00",
      "title": "Anastasia Website Warroom"
    },
    {
      "id": 4,
      "roomId": "A101",
      "startTime": "2019-09-29 13:00:00",
      "endTime": "2019-09-29 14:00:00",
      "title": "One-on-One Session"
    },
    {
      "id": 5,
      "roomId": "A101",
      "startTime": "2019-09-29 16:00:00",
      "endTime": "2019-09-29 18:00:00",
      "title": "UGC Sprint Planning"
    },
    {
      "id": 6,
      "roomId": "A102",
      "startTime": "2019-09-30 09:00:00",
      "endTime": "2019-10-04 18:00:00",
      "title": "5-Day Design Sprint Workshop"
    },
    {
      "id": 7,
      "roomId": "Auditorium",
      "startTime": "2019-09-19 09:00:00",
      "endTime": "2019-09-23 19:00:00",
      "title": "Thai Tech Innovation 2019"
    },
    {
      "id": 8,
      "roomId": "A101",
      "startTime": "2019-09-28 10:00:00",
      "endTime": "2019-09-28 13:00:00",
      "title": "Raimonland project"
    },
    {
      "id": 9,
      "roomId": "A102",
      "startTime": "2019-09-30 18:00:00",
      "endTime": "2019-09-30 20:00:00",
      "title": "Management Meetinng"
    },
    {
      "id": 10,
      "roomId": "A101",
      "startTime": "2019-10-04 14:00:00",
      "endTime": "2019-10-06 11:00:00",
      "title": "3-day workshop Corgi costume"
    },
    {
        "id": 11,
        "roomId": "A101",
        "startTime": "2020-11-21 14:00:00",
        "endTime": "2020-11-21 18:00:00",
        "title": "Current date busy"
    }
]

const lastMonday = (dateObject) => {
    const today = dateObject.getDate();
    const dayOfTheWeek = dateObject.getDay();
    const newDate = dateObject.setDate(today - (dayOfTheWeek == 0 ? 6 : dayOfTheWeek - 1));
    return new Date(newDate);
}

const upcomingSunday = (dateObject) => {
    const today = dateObject.getDate();
    const dayOfTheWeek = dateObject.getDay();
    const newDate = dateObject.setDate(today + (dayOfTheWeek == 0 ? 0 : 7 - dayOfTheWeek));
    return new Date(newDate);
}

const isBetween = (date, min, max) => (date.getTime() >= min.getTime() && date.getTime() <= max.getTime());
const checkAvailability = (roomId, startTime, endTime) => {
    const dateStart = new Date(startTime);
    const dateEnd = new Date(endTime);
    const rooms = bookingData.filter((item)=>{
        const roomDateStart = new Date(item.startTime);
        const roomDateEnd = new Date(item.endTime);
        return item.roomId === roomId && (isBetween(dateStart , roomDateStart , roomDateEnd) || isBetween(dateEnd , roomDateStart , roomDateEnd))
    });
    if(rooms.length > 0) {
        return false;
    }
    return true;
 }

const getBookingsForWeek = (roomId , nextWeek = false) => {
    let currDay = new Date();
    if(nextWeek) {
        currDay.setDate(currDay.getDate() + 7);
    }
    const monday = lastMonday(currDay);
    // console.log('monday' , monday);
    const sunday = upcomingSunday(currDay);
    // console.log('sunday' , sunday);
    const bookingToday = bookingData.filter((item)=> {
        const startTime = new Date(item.startTime);
        // console.log('starttime' , startTime)
        return item.roomId === roomId && isBetween(startTime , monday , sunday);
    })
    return bookingToday;
}



 describe('Room available', () => {

    test('A101 not available', () => {
        const available = checkAvailability('A101' , '2019-09-28 13:10' , '2019-09-28 13:30');
        expect(available).toBe(false);
    })

    test('A101 not available', () => {
        const available = checkAvailability('A101' , '2019-09-28 14:10' , '2019-09-28 18:00');
        expect(available).toBe(false);
    })

    test('A101 available' , () => {
        const available = checkAvailability('A101' , '2020-09-28 13:10' , '2020-09-28 13:30');
        expect(available).toBe(true);
    })

    test('A102 available' , () => {
        const available = checkAvailability('A102' , '2020-09-28 13:10' , '2020-09-28 13:30');
        expect(available).toBe(true);
    })

    test('Booking A101 in today is empty', () =>  {
        const bookings = getBookingsForWeek('A101');
        const today = new Date();
        const currentRoomBooking = bookings.filter((item)=>{
            const startTime = new Date(item.startTime);
            const endTime = new Date(item.endTime);
            return item.roomId === 'A101' && isBetween(today , startTime , endTime)
        })
        expect(currentRoomBooking).toHaveLength(0);
    })

    test('Booking A101 in this week is empty', () =>  {
        const bookings = getBookingsForWeek('A101');
        expect(bookings).toHaveLength(1);
    })

    test('Booking A101 in next week is empty', () =>  {
        const bookings = getBookingsForWeek('A101' , true);
        expect(bookings).toHaveLength(0);
    })

 })
