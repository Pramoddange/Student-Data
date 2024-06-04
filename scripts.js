document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';
    let students = [];
    let filteredStudents = [];

    // Fetch data from the URL
    fetch(url)
        .then(response => response.json())
        .then(data => {
            students = data;
            filteredStudents = data;
            populateTable(students);
        });

    // Function to populate the table
    function populateTable(data) {
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';

        data.forEach((student, index) => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = index + 1;

            const imgCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = student.img_src;
            img.alt = `${student.first_name} ${student.last_name}`;
            const nameCell = document.createElement('td');
            nameCell.appendChild(img);
            nameCell.appendChild(document.createTextNode(` ${student.first_name} ${student.last_name}`));

            const genderCell = document.createElement('td');
            genderCell.textContent = student.gender;

            const classCell = document.createElement('td');
            classCell.textContent = student.class;

            const marksCell = document.createElement('td');
            marksCell.textContent = student.marks;

            const passingCell = document.createElement('td');
            passingCell.textContent = student.passing ? 'Passing' : 'Failed';

            const emailCell = document.createElement('td');
            emailCell.textContent = student.email;

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(genderCell);
            row.appendChild(classCell);
            row.appendChild(marksCell);
            row.appendChild(passingCell);
            row.appendChild(emailCell);

            tableBody.appendChild(row);
        });
    }

    // Search functionality
    document.getElementById('search').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filteredStudents = students.filter(student => 
            student.first_name.toLowerCase().includes(searchTerm) || 
            student.last_name.toLowerCase().includes(searchTerm) || 
            student.email.toLowerCase().includes(searchTerm)
        );
        populateTable(filteredStudents);
    });

    // Sorting functionality
    document.getElementById('sort-az').addEventListener('click', () => {
        filteredStudents.sort((a, b) => `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`));
        populateTable(filteredStudents);
    });

    document.getElementById('sort-za').addEventListener('click', () => {
        filteredStudents.sort((a, b) => `${b.first_name} ${b.last_name}`.localeCompare(`${a.first_name} ${a.last_name}`));
        populateTable(filteredStudents);
    });

    document.getElementById('sort-marks').addEventListener('click', () => {
        filteredStudents.sort((a, b) => a.marks - b.marks);
        populateTable(filteredStudents);
    });

    document.getElementById('sort-passing').addEventListener('click', () => {
        const passingStudents = students.filter(student => student.passing);
        populateTable(passingStudents);
    });

    document.getElementById('sort-class').addEventListener('click', () => {
        filteredStudents.sort((a, b) => a.class - b.class);
        populateTable(filteredStudents);
    });

    document.getElementById('sort-gender').addEventListener('click', () => {
        const maleStudents = students.filter(student => student.gender === 'male');
        const femaleStudents = students.filter(student => student.gender === 'female');

        const maleTable = document.getElementById('male-table');
        const femaleTable = document.getElementById('female-table');

        maleTable.innerHTML = '<h2>Male Students</h2><table id="male-student-table"><thead><tr><th>ID</th><th>Name</th><th>Gender</th><th>Class</th><th>Marks</th><th>Passing</th><th>Email</th></tr></thead><tbody></tbody></table>';
        femaleTable.innerHTML = '<h2>Female Students</h2><table id="female-student-table"><thead><tr><th>ID</th><th>Name</th><th>Gender</th><th>Class</th><th>Marks</th><th>Passing</th><th>Email</th></tr></thead><tbody></tbody></table>';

        maleTable.style.display = 'block';
        femaleTable.style.display = 'block';

        populateTableWithGender(maleStudents, 'male-student-table');
        populateTableWithGender(femaleStudents, 'female-student-table');
    });

    // Function to populate gender-specific tables
    function populateTableWithGender(data, tableId) {
        const tableBody = document.querySelector(`#${tableId} tbody`);
        tableBody.innerHTML = '';

        data.forEach((student, index) => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = index + 1;

            const imgCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = student.img_src;
            img.alt = `${student.first_name} ${student.last_name}`;
            const nameCell = document.createElement('td');
            nameCell.appendChild(img);
            nameCell.appendChild(document.createTextNode(` ${student.first_name} ${student.last_name}`));

            const genderCell = document.createElement('td');
            genderCell.textContent = student.gender;

            const classCell = document.createElement('td');
            classCell.textContent = student.class;

            const marksCell = document.createElement('td');
            marksCell.textContent = student.marks;

            const passingCell = document.createElement('td');
            passingCell.textContent = student.passing ? 'Passing' : 'Failed';

            const emailCell = document.createElement('td');
            emailCell.textContent = student.email;

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(genderCell);
            row.appendChild(classCell);
            row.appendChild(marksCell);
            row.appendChild(passingCell);
            row.appendChild(emailCell);

            tableBody.appendChild(row);
        });
    }
});