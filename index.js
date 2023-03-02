let t = new Date();
        let date = t.getDate();
        let month = t.getMonth() + 1; 
        let year = t.getFullYear();
        if (date < 10) {
            date = '0' + date
        }
        if (month < 10) {
            month = '0' + month
        }
        maxDate = year - 18 + '-' + month + '-' + date;
        minDate = year - 55 + '-' + month + '-' + date;
        document.getElementById("dob").setAttribute("min", minDate);
        document.getElementById("dob").setAttribute("max", maxDate);

        let Entries1 = localStorage.getItem("user-entries");
        if (Entries1) {
            Entries1 = JSON.parse(Entries1);
        } else {
            Entries1 = [];
        }

        const displayEntries = () => {
            const savedEntries = localStorage.getItem("user-entries");
            let entry = "";
            if (savedEntries) {
                const parsedEntries = JSON.parse(savedEntries);
                entry = parsedEntries
                    .map((entry) => {
                        const name = `<td class='border px-4 py-2'>${entry.name}</td>`;
                        const email = `<td class='border px-4 py-2'>${entry.email}</td>`;
                        const password = `<td class='border px-4 py-2'>${entry.password}</td>`;
                        const dob = `<td class='border px-4 py-2'>${entry.dob}</td>`;
                        const acceptTerms = `<td class='border px-4 py-2'>${entry.acceptTermsAndConditions}</td>`;
                        const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
                        return row;
                    })
                    .join("\n");
            }
            var table = `<table class="table-auto w-full"><tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Password</th>
          <th class="px-4 py-2">Dob</th>
          <th class="px-4 py-2">Accepted terms?</th>
        </tr>${entry} </table>`;
            let details = document.getElementById("user-entries");
            details.innerHTML = table;
        };

        const saveUserForm = (event) => {
            event.preventDefault();
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const dob = document.getElementById("dob").value;
            const acceptTermsAndConditions =
                document.getElementById("acceptTerms").checked;
            const userDetails = {
                name,
                email,
                password,
                dob,
                acceptTermsAndConditions,
            };
            Entries1.push(userDetails);
            localStorage.setItem("user-entries", JSON.stringify(Entries1));

            displayEntries(); 
        };

        let form = document.getElementById("user_form");
        form.addEventListener("submit", saveUserForm, true);
        displayEntries();
