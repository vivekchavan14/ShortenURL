document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('shorten-form');
    const resultDiv = document.getElementById('result');
    const analyticsButton = document.getElementById('analytics');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const urlInput = document.getElementById('url');
        const url = urlInput.value;

        if (!url) {
            resultDiv.textContent = 'Please enter a valid URL';
            return;
        }

        try {
            const response = await fetch('/url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();
            resultDiv.textContent = `Shortened URL: http://yourdomain.com/url/${data.id}`;
        } catch (error) {
            console.error(error);
            resultDiv.textContent = 'An error occurred';
        }
    });

    analyticsButton.addEventListener('click', async function () {
        const shortId = prompt('Enter the Short ID:');
        if (!shortId) {
            alert('Please enter a Short ID');
            return;
        }

        try {
            const response = await fetch(`/url/analytics/${shortId}`);
            const data = await response.json();
            const analyticsContent = JSON.stringify(data, null, 2);
            alert(`Analytics:\n${analyticsContent}`);
        } catch (error) {
            console.error(error);
            alert('An error occurred while fetching analytics');
        }
    });
});
