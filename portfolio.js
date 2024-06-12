document.addEventListener('DOMContentLoaded', function() {
    const defaultLang = 'fr';
    setLanguage(defaultLang);

    function setLanguage(lang) {
        let langFile, subtitlesFile;
        switch(lang) {
            case 'fr':
                langFile = 'content-fr.json';
                subtitlesFile = 'french_subtitles.vtt';
                break;
            case 'en':
                langFile = 'content-en.json';
                subtitlesFile = 'english_subtitles.vtt';
                break;
            case 'zh':
                langFile = 'content-zh.json';
                subtitlesFile = 'chinese_subtitles.vtt';
                break;
            default:
                langFile = 'content-en.json';
                subtitlesFile = 'english_subtitles.vtt';
        }

        fetch(langFile)
            .then(response => response.json())
            .then(data => {
                document.getElementById('name').textContent = data.name;
                document.getElementById('description').textContent = data.description;
                document.getElementById('about_title').textContent = data.about_title;
                document.getElementById('about_text').textContent = data.about_text;
                document.getElementById('hard_skills_title').textContent = data.hard_skills_title;
                document.getElementById('soft_skills_title').textContent = data.soft_skills_title;
                document.getElementById('experience_title').textContent = data.experience_title;
                document.getElementById('education_title').textContent = data.education_title;
                document.getElementById('contact_title').textContent = data.contact_title;

                const hardSkillsList = document.getElementById('hard_skills');
                hardSkillsList.innerHTML = '';
                data.hard_skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    hardSkillsList.appendChild(li);
                });

                const softSkillsList = document.getElementById('soft_skills');
                softSkillsList.innerHTML = '';
                data.soft_skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    softSkillsList.appendChild(li);
                });

                const experiencesDiv = document.getElementById('experiences');
                experiencesDiv.innerHTML = '';
                data.experiences.forEach(exp => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <h3>${exp.role}</h3>
                        <p>${exp.company} - ${exp.location}</p>
                        <p>${exp.start_date} - ${exp.end_date}</p>
                        <ul>
                            ${exp.tasks.map(task => `<li>${task}</li>`).join('')}
                        </ul>
                    `;
                    experiencesDiv.appendChild(div);
                });

                const educationDiv = document.getElementById('education_list');
                educationDiv.innerHTML = '';
                data.education.forEach(edu => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <h3>${edu.degree}</h3>
                        <p>${edu.institution} - ${edu.location}</p>
                        <p>${edu.start_date ? edu.start_date + ' - ' : ''}${edu.end_date}</p>
                        <p>${edu.details}</p>
                    `;
                    educationDiv.appendChild(div);
                });

                document.getElementById('email').textContent = data.contact.email;
                document.getElementById('email').href = `mailto:${data.contact.email}`;
                document.getElementById('phone').textContent = data.contact.phone;
                document.getElementById('phone').href = `tel:${data.contact.phone}`;
                document.getElementById('address').textContent = data.contact.address;

                // Update subtitles
                const subtitlesTrack = document.getElementById('subtitles');
                subtitlesTrack.src = subtitlesFile;
                subtitlesTrack.label = data.contact_title; 
            })
            .catch(error => console.error('Error loading content:', error));
    }

    window.setLanguage = setLanguage; 
});
