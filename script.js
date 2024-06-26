document.addEventListener('DOMContentLoaded', () => {
    const ageElem = document.getElementById('age');
    const genderElem = document.getElementById('gender');
    const contactElem = document.getElementById('contact');
    const insuranceElem = document.getElementById('insurance');
    const profilePictureElem = document.getElementById('profile-picture');
    const patientListElem = document.getElementById('patient-list');
    const diagnosticListElem = document.getElementById('diagnostic-list');
    const ctx = document.getElementById('bloodPressureChart').getContext('2d');
    
    const username = 'coalition';
    const password = 'skills-test';
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
    
    fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
        headers: {
            'Authorization': basicAuth
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        const patient = data.find(patient => patient.name === 'Jessica Taylor');
        if (patient) {
            // Format the date of birth
            const dob = new Date(patient.date_of_birth);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDOB = dob.toLocaleDateString('en-US', options);

            document.getElementById('dob').textContent = `${formattedDOB}`;
            genderElem.textContent = `${patient.gender}`;
            contactElem.textContent = `${patient.phone_number}`;
            document.getElementById('emergency-contact').textContent = `${patient.emergency_contact}`;
            insuranceElem.textContent = `${patient.insurance_type}`;
            

            const lastDiagnosis = patient.diagnosis_history[patient.diagnosis_history.length - 1];
            document.getElementById('systolic-value').textContent = lastDiagnosis.blood_pressure.systolic.value;
            document.getElementById('diastolic-value').textContent = lastDiagnosis.blood_pressure.diastolic.value;
            document.getElementById('respiratory-rate').textContent = `${lastDiagnosis.respiratory_rate.value} bpm`;
            document.getElementById('temperature').textContent = `${lastDiagnosis.temperature.value}°F`;
            document.getElementById('heart-rate').textContent = `${lastDiagnosis.heart_rate.value} bpm`;
            
            const displayedPatients = data.slice(0, 12);
            displayedPatients.forEach((p) => {
                const listItem = document.createElement('li');
                listItem.className = p.name === 'Jessica Taylor' ? 'active' : '';
                listItem.innerHTML = `
                    <img src="${p.profile_picture}" alt="${p.name}" class="patient-img1">
                    <div> 
                        <p class="name">${p.name}</p>
                        <p>${p.gender}, ${p.age}</p>
                    </div>
                    <img src="images/more_horiz_FILL0_wght300_GRAD0_opsz24@2x.png" alt="Options" class="more-options">
                `;
                patientListElem.appendChild(listItem);
            });

            patient.diagnostic_list.forEach((diagnostic) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                
                    <td>${diagnostic.name}</td>
                    <td>${diagnostic.description}</td>
                    <td>${diagnostic.status}</td>
                    

                `;
                diagnosticListElem.appendChild(row);
            });

            renderChart(patient.diagnosis_history);
        } else {
            console.error('Patient Jessica Taylor not found');
        }
    })
    .catch(error => console.error('Error fetching data:', error));
    
    function renderChart(diagnosisHistory) {
        const now = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Exclude the current month and get the last 6 complete months
        const lastSixMonths = diagnosisHistory.slice(-7, -1);
        
        // Generate labels for the last 6 months
        const labels = lastSixMonths.map((item, index) => {
            const month = new Date(now.getFullYear(), now.getMonth() - 6 + index, 1);
            return `${months[month.getMonth()]} ${month.getFullYear()}`;
        });
        
        const systolicData = lastSixMonths.map(item => item.blood_pressure.systolic.value);
        const diastolicData = lastSixMonths.map(item => item.blood_pressure.diastolic.value);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Systolic',
                        data: systolicData,
                        borderColor: '#E66FD2',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#E66FD2'
                    },
                    {
                        label: 'Diastolic',
                        data: diastolicData,
                        borderColor: '#8C6FE6',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#8C6FE6'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        min: 40,
                        max: 180,
                        grid: {
                            display: true
                        }
                    }
                }
            }
        });
    }
});
