//file name: helperFunctions.js
const API_KEY = 'AIzaSyA2Q8U9NWdc1jVYDX_r_ED9UuAXQKQclJM'; //put your key here.
//this endpoint will tell Google to use the Vision API. We are passing in our key as well.
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
function generateBody(image: string) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'TEXT_DETECTION', //we will use this API for text detection purposes.
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
}

async function callGoogleVisionAsync(image: string) {
  const body = generateBody(image); //pass in our image for the payload
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  const detectedText = result?.responses?.[0].fullTextAnnotation;
  const error = result.error

  const data = error ?  error : detectedText ? detectedText : { text: "This image doesn't contain any text!" };
  return data 
}
export default callGoogleVisionAsync;