import {youtube_v3} from "googleapis";
import Schema$VideoLiveStreamingDetails = youtube_v3.Schema$VideoLiveStreamingDetails;

declare interface GetLiveStreamingDetailsResult {
  exists: boolean
  liveStreamingDetails: Schema$VideoLiveStreamingDetails
}