const scriptUrl = 'https://script.google.com/macros/s/AKfycbwivZFkwuOZGxIaBSH0QXtgqjShBxx9cLfPc2DsZHQjoPytnBweREV7MBbc8R4InAUC/exec';

function loadEmbeds() {
    fetch(scriptUrl)
        .then(response => response.json())
        .then(data => {
            const videoList = document.getElementById('videoList');
            videoList.innerHTML = ''; // 기존 내용을 초기화

            data.forEach(entry => {
                const embedContainer = document.createElement('div');
                embedContainer.className = 'embed-container';
                embedContainer.innerHTML = entry.embed;

                videoList.appendChild(embedContainer);
            });

            // Instagram embed script reinitialization
            setTimeout(() => {
                if (window.instgrm) {
                    instgrm.Embeds.process();
                }
            }, 1000); // 일정 시간 후에 스크립트를 다시 처리
        })
        .catch(error => {
            console.error('Error loading data:', error);
            document.getElementById('videoList').innerHTML = 'Failed to load embeds.';
        });
}

document.addEventListener('DOMContentLoaded', loadEmbeds);
