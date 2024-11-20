# MCA-Mumbai-University-Result-Parser-(Batch: 2023-2025)

## Approach

1. Read the entire pdf page wise.
2. Extract Course Structure & Courses List
3. Create a json general structure from it
4. Create and store the data of students on a single page in an array.
5. Process each student's raw data to json
6. Append converted json data of each student to the json array of "StudentsData"
7. Convert the json data in tabluar form
8.  

## Testing

1. Student status = Passed
2. Student status = Failed
3. Student status = Absent
4. Student with KT
5. data of 2 Students with status = pass
6. data of 2 Students with status = fail
7. data of 2 Students with status = absent
8. data of 3 Students with status = P, F, & A
9. data of 1 page
10. data of 2 pages
11. data of 3 pages
12. data of 4 pages
13. data of 5 pages

## Working on

Wokring on "/practice/temp2.js".
Still now i m getting following output:

```json
[
  {
    seat_no: '9303351',
    name: 'BORHADE SIDDHI SANJAY SUVARNA',
    prn: '2020016400304377',
    coll_code: '456',
    coll_name: 'SIES NERUL NAVI MUMBAI',
    status: 'P',
    totals: {
      total_marks: '850',
      total_marks_obtain: '642',
      total_credits: '21',
      total_cgp: '184',
      gpi: '8.76'
    }
  },
  {
    seat_no: '9303352',
    name: 'CHAWAN SHAURYA MANGESH PRERANA',
    prn: '2023016402350386',
    coll_code: '456',
    coll_name: 'SIES NERUL NAVI MUMBAI',
    status: 'F',
    totals: {
      total_marks: '850',
      total_marks_obtain: '559',
      total_credits: '15',
      total_cgp: '120',
      gpi: '--'
    }
  },
  {
    seat_no: '9303353',
    name: 'CHOUBE ANURAG VINOD ANITA',
    prn: '2023016402350282',
    coll_code: '456',
    coll_name: 'SIES NERUL NAVI MUMBAI',
    status: 'F',
    totals: {
      total_marks: '850',
      total_marks_obtain: '547',
      total_credits: '17',
      total_cgp: '127',
      gpi: '--'
    }
  }
]
```