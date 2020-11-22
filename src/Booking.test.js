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
    }
]
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
 })
