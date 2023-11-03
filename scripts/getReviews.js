console.log("Hello world")

window.onload = () => {
    let businessData = sessionStorage.getItem('businessData');
    if (businessData == null) {
        const businessDetails = getBusiness();
        businessDetails.then((result) => {
            createReviews(result.reviews);
            sessionStorage.setItem('businessData', JSON.stringify(result));
        })
    } else {
    businessData = JSON.parse(businessData);
    createReviews(businessData.reviews);
    }
    
}

async function getBusiness() {
    const businessDetails = await fetch('http://localhost:4000/api/getBusiness', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: ["reviews","opening_hours/weekday_text"],
            placeID: 'ChIJ22EVfGQ6jkcRb7QGzGD_fTM'
        })
    })

    const content = await businessDetails.json();

    console.log(content);
    return content;
}

function createReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews')
    reviews.forEach(review => {
        console.log(review.author_name);

        const reviewContainer = document.createElement('div');
        reviewContainer.classList.add('w-80', 'shadow-lg', 'px-6', 'py-4', 'rounded-xl', 'border-[#207BFF]', 'border-2', 'min-w-[300px]', 'snap-center', 'snap-always');
        reviewsContainer.appendChild(reviewContainer);

        const reviewName = document.createElement('p');
        reviewName.classList.add('text-lg', 'font-semibold');
        reviewName.innerText = review.author_name;
        reviewContainer.appendChild(reviewName)

        const reviewRatingContainer = document.createElement('div');
        reviewRatingContainer.classList.add('flex', 'items-center', 'space-x-1', 'my-1');
        reviewContainer.appendChild(reviewRatingContainer);

        for (let i = 0; i < review.rating; i++) {
            const starSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const starPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            starSVG.classList.add('w-5', 'h-5', 'text-yellow-300')
            starSVG.setAttribute('aria-hidden', 'true');
            starSVG.setAttribute('fill', 'currentColor');
            starSVG.setAttribute('viewBox', '0 0 22 20');
            starSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            starPath.setAttribute('d', 'M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z')

            starSVG.appendChild(starPath);
            reviewRatingContainer.appendChild(starSVG);
        }

        if (review.rating != 5) {
            ratingDifference = 5 - review.rating;
            for (let i = 0; i < ratingDifference; i++) {
                const starSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const starPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            starSVG.classList.add('w-5', 'h-5', 'text-gray-300')
            starSVG.setAttribute('aria-hidden', 'true');
            starSVG.setAttribute('fill', 'currentColor');
            starSVG.setAttribute('viewBox', '0 0 22 20');
            starSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            starPath.setAttribute('d', 'M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z')

            starSVG.appendChild(starPath);
            reviewRatingContainer.appendChild(starSVG);
            }
        }

        const reviewTextContainer = document.createElement('div');
        const reviewText = document.createElement('p');
        reviewTextContainer.appendChild(reviewText);

        reviewText.innerText = review.text;
        reviewContainer.appendChild(reviewTextContainer);
    })
}