/* eslint-disable */

import * as functions from 'firebase-functions'
import {google} from 'googleapis'

const cors = require('cors')({
  origin: ['https://www.youtube.com'],
})

exports.getLiveStreamDetails = functions.runWith({secrets: ['GOOGLEAPIS_KEY']})
  .region('asia-northeast1').https.onRequest((req, resp) => {
    cors(req, resp, async () => {
      if (!req.query.v) {
        resp.statusCode = 400
        resp.json({
          error: 'not enough parameter',
        })
        return
      }

      try {
        const result = await google.youtube('v3').videos.list({
          key: process.env.GOOGLEAPIS_KEY,
          part: ['liveStreamingDetails'],
          id: [req.query.v.toString()],
        })
        const liveStreamingDetails = result.data.items?.[0]?.liveStreamingDetails

        if (liveStreamingDetails) {
          resp.json({
            exists: true,
            liveStreamingDetails,
          })
        } else {
          resp.json({
            exists: false,
            liveStreamingDetails: null,
          })
        }
      } catch (e) {
        console.log(e)
        resp.sendStatus(500)
      }
    })
  })
