// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

var url = "http://a105-34-66-192-158.ngrok-free.app"

export default async function handler(req, res) {
  const referer = req.headers.referer || req.headers.referrer; // get the referer from the request headers

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method should be get' });
  } else if (process.env.NODE_ENV !== "development") {
    if (!referer || referer !== process.env.APP_URL) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
  else {
    try {
      const { body } = req;
      const url = url
      const headers = {
        'Content-type': 'application/json',
        // 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      };

      const response = await axios.get(url, body, { headers: headers })

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  
}
