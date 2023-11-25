const fs = require('fs');
const csv = require('csv-parser');

// Read the CSV file and extract reviews
const sentences = [];
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    sentences.push(row.Review);
  })
  .on('end', () => {
    // Read and update the JSON file
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return;
      }

      const jsonData = JSON.parse(data);

      // Update each document in the JSON file
      jsonData.forEach((user) => {
        const userReviews = [];

        // Generate random reviews based on user_hireCount
        for (let i = 0; i < user.user_hireCount; i++) {
          const randomReviewIndex = Math.floor(Math.random() * sentences.length);

          // Ensure reviewerId is different from reviewId
          let reviewerId;
          do {
            reviewerId = jsonData[Math.floor(Math.random() * jsonData.length)]._id.$oid;
          } while (reviewerId === user._id.$oid);

          const reviewer = jsonData.find((reviewerUser) => reviewerUser._id.$oid === reviewerId);

          const randomReview = {
            reviewId: reviewerId,
            reviewerId: reviewerId,
            reviewerName: reviewer.user_fullname,
            reviewerImg: reviewer.user_img,
            review: sentences[randomReviewIndex],
            date: getRandomDate('2022-01-01', '2023-12-31').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          };

          userReviews.push(randomReview);
        }

        // Update user_reviews in the JSON
        user.user_reviews = userReviews;
      });

      // Write the updated JSON back to the file
      fs.writeFile('your_updated_json_file.json', JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing updated JSON file:', writeErr);
        } else {
          console.log('JSON file updated successfully!');
        }
      });
    });
  });

function getRandomDate(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
}
